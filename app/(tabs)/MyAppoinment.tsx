import React, { useMemo, useState, useCallback } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Searchbox from "@/components/ui/Searchbox";
import { router } from "expo-router";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";
import {
  Appointment,
  AppointmentStatus,
  useAppointments,
} from "@/hooks/MyAppointments_API";
import { useAuth } from "@/context/AuthContext";
import { cancelAppointment } from "@/hooks/cancelAppointment_API";
import profileImg from "@/assets/images/user_img.png";
import dayjs from "dayjs";

const tabNames = ["All", "Upcoming", "Completed", "Cancelled"] as const;
const translationKeysMap: Record<string, string> = {
  All: "all",
  Upcoming: "upComing",
  Completed: "completed",
  Cancelled: "cancelled",
};

type EffectiveStatus = "Upcoming" | "Completed" | "Cancelled";

const Appoinment = () => {
  const { user, formatPhoneNumber } = useAuth();
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  const [cancelModal, setCancelModal] = useState(false);
  const [activeTab, setActiveTab] =
    useState<(typeof tabNames)[number]>("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const now = dayjs();
  const today = now.startOf("day");
  const isUserReady = Boolean(user?.phoneNumber);
  const safePhone = isUserReady ? formatPhoneNumber(user!.phoneNumber!) : "";

  // מושכים תמיד All (רק Cancelled כחריג אם רוצים לחסוך דאטה)
  const fetchStatus: AppointmentStatus =
    activeTab === "Cancelled" ? "Cancelled" : "All";

  const { appointments, loading, error } = useAppointments(
    safePhone,
    fetchStatus,
    now.month() + 1,
    now.year()
  );

  const getEffectiveStatus = (a: Appointment): EffectiveStatus => {
    if ((a.sessionStatus as EffectiveStatus) === "Cancelled") return "Cancelled";
    const isPast = dayjs(a.date, "YYYY-MM-DD").isBefore(today, "day");
    if (isPast) return "Completed";
    return (a.sessionStatus as EffectiveStatus) || "Upcoming";
  };

  const data = useMemo(() => {
    // העשרנו ב-effectiveStatus
    let list = appointments.map((a) => ({
      ...a,
      effectiveStatus: getEffectiveStatus(a),
    }));

    // סינון לפי טאב
    if (activeTab !== "All") {
      list = list.filter((a) => a.effectiveStatus === activeTab);
    }

    // חיפוש
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(q));
    }

    // מיון ב-All
    if (activeTab === "All") {
      list = [...list].sort((a, b) =>
        dayjs(a.date, "YYYY-MM-DD").diff(dayjs(b.date, "YYYY-MM-DD"))
      );
    }

    return list;
  }, [appointments, activeTab, searchQuery, today]);

  const Header = useMemo(
    () => (
      <View style={{ paddingBottom: 16 }}>
        {/* כותרת */}
        <View
          style={{ flexDirection: isRTL ? "row-reverse" : "row", alignItems: "center" }}
          className="pt-6"
        >
          <MaterialCommunityIcons
            name="calendar-check-outline"
            size={24}
            color={colors.tint}
          />
          <Text
            style={{ color: colors.text, textAlign: isRTL ? "right" : "left" }}
            className="text-2xl font-semibold ml-2"
          >
            {i18n.t("myAppoinments")}
          </Text>
        </View>

        {/* חיפוש */}
        <View className="pt-8">
          <Searchbox onSearch={setSearchQuery} />
        </View>

        {/* טאבים */}
        <View
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          className="pt-6 flex-row justify-between items-center"
        >
          {tabNames.map((item) => (
            <Pressable
              key={item}
              onPress={() => setActiveTab(item)}
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderBottomColor:
                  activeTab === item ? colors.tint : colors.inputBorder,
                padding: 4,
                alignItems:"center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  padding: 1,
                  width:90,
                  color: activeTab === item ? colors.tint : colors.text,
                }}
              >
                {i18n.t(translationKeysMap[item])}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* מצב ביניים – מחכים ל־Auth */}
        {!isUserReady && (
          <View style={{ paddingTop: 24, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: colors.text, fontSize: 22 }}>{i18n.t("loading")}</Text>
          </View>
        )}
      </View>
    ),
    [activeTab, colors.inputBorder, colors.text, colors.tint, i18n, isRTL, isUserReady]
  );

  const keyExtractor = useCallback(
    (item: any, idx: number) => `${item.course_id}:${item.date}:${idx}`,
    []
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      const status = item.effectiveStatus as EffectiveStatus;
      const isUpcoming = status === "Upcoming";
      const statusText = i18n.t(translationKeysMap[status]);
  
      const statusColors = {
        text: status === "Upcoming" ? "#5554DB" : status === "Completed" ? "#1A7F37" : "#f75555",
        bg:   status === "Upcoming" ? "#d4d4fc" : status === "Completed" ? "#E6F4EA" : "#feeeee",
      };
  
      return (
        <View
          style={{
            padding: 12,
            borderColor: colors.inputBorder,
            backgroundColor: colors.card,
            borderRadius: 10,
            marginBottom: 15,
            shadowOpacity: 0.5,
            shadowColor:colors.text,
            shadowOffset: { width: 0, height: 2 }, // כיוון הצל (iOS)
            shadowRadius: 4,         // רדיוס טשטוש הצל (iOS)
            elevation: 5,    
          }}
        >
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              borderBottomWidth: 1,
              borderBottomColor: colors.inputBorder,
              paddingBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                flex: 1,
                alignItems: "center",
              }}
            >
              <View style={{ marginHorizontal: 12, borderRadius: 8, overflow: "hidden" }}>
                <Image
                  source={item.image && item.image.startsWith("http") ? { uri: item.image } : profileImg}
                  style={{ width: 80, height: 80 }}
                />
              </View>
  
              <View>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: isRTL ? "right" : "left",
                    marginBottom: 4,
                  }}
                >
                  {item.name}
                </Text>
  
                <View style={{ flexDirection: isRTL ? "row-reverse" : "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: statusColors.text,
                      backgroundColor: statusColors.bg,
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    {statusText}
                  </Text>
                </View>
  
                <View style={{ paddingTop: 8, gap: 4, flexDirection: isRTL ? "row-reverse" : "row" }}>
                  <View style={{ flexDirection: "row", justifyContent: isRTL ? "flex-end" : "flex-start", alignItems: "center" }}>
                    <AntDesign name="clockcircle" size={12} color={colors.text} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: colors.text, textAlign: isRTL ? "right" : "left" }}>
                      {item.availableTime}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: isRTL ? "flex-end" : "flex-start", alignItems: "center" }}>
                    <AntDesign name="calendar" size={12} color={colors.text} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: colors.text, textAlign: isRTL ? "right" : "left" }}>
                      {item.date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
  
          {isUpcoming && (
            <View style={{ flexDirection: isRTL ? "row-reverse" : "row", justifyContent: "space-between", marginTop: 12 }}>
              <Text
                onPress={() => { setSelectedId(item.course_id); setCancelModal(true); }}
                style={{
                  color: colors.tint,
                  borderWidth: 1,
                  borderColor: colors.tint,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  textAlign: "center",
                  flex: 1,
                  marginRight: isRTL ? 0 : 8,
                  marginLeft: isRTL ? 8 : 0,
                }}
              >
                {i18n.t("cancel")}
              </Text>
  
              <Text
                style={{
                  color: colors.buttonText,
                  backgroundColor: colors.buttonBackground,
                  borderWidth: 1,
                  borderColor: colors.buttonBackground,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                {i18n.t("changeDate")}
              </Text>
            </View>
          )}
        </View>
      );
    },
    [colors, isRTL, i18n]
  );
  

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* טעינה / שגיאה / רשימה */}
      {loading ? (
        <View style={{ paddingTop: 24, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: colors.text }}>
            {i18n.t("loading")}...
          </Text>
        </View>
      ) : !isUserReady ? (
        <View style={{ paddingTop: 24, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: colors.text }}>
            {i18n.t("loading")}...
          </Text>
        </View>
      ) : error ? (
        <View style={{ paddingTop: 24, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: colors.text }}>
            {i18n.t("error")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          ListEmptyComponent={
            <View style={{ paddingTop: 24, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 22, color: colors.text }}>
                {searchQuery.trim() ? i18n.t("noResultsForSearch") : i18n.t("noBookingFound")}
              </Text>
            </View>
          }
          // רענון משיכה למטה (אם ה-hook תומך)

          // refreshing={loading}
          // onRefresh={refetch}

          // אם רוחב/גובה הפריט קבועים, אפשר לממש getItemLayout לשיפור ביצועים
          // getItemLayout={(_, index) => ({ length: 136, offset: 136 * index, index })}
          keyboardShouldPersistTaps="handled"
        />
      )}

      {/* Modal ביטול */}
      <Modal visible={cancelModal} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              width: "100%",
              paddingTop: 32,
              paddingHorizontal: 24,
              paddingBottom: 24,
              borderTopLeftRadius: 60,
              borderTopRightRadius: 60,
            }}
          >
            <View
              style={{
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.inputBorder,
              }}
            >
              <Text
                style={{
                  color: "#ff5630",
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {i18n.t("cancelAppointment")}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingTop: 16,
                textAlign: "center",
                color: colors.text,
              }}
            >
              {i18n.t("cancelMessageSure")}
            </Text>

            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                marginTop: 32,
              }}
            >
              <Pressable
                onPress={() => setCancelModal(false)}
                style={{
                  flex: 1,
                  marginRight: isRTL ? 0 : 8,
                  marginLeft: isRTL ? 8 : 0,
                }}
              >
                <Text
                  style={{
                    color: colors.tint,
                    borderWidth: 1,
                    borderColor: colors.tint,
                    paddingVertical: 16,
                    textAlign: "center",
                    borderRadius: 8,
                  }}
                >
                  {i18n.t("cancel")}
                </Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  if (selectedId) {
                    const { success, error: cancelError, message } =
                      await cancelAppointment(selectedId, safePhone);
                    if (success) {
                      setCancelModal(false);
                      router.push("/CancelAppoinmentSuccessfully");
                    } else {
                      alert(
                        i18n.t("cancelErrorAppinment") ||
                          message ||
                          i18n.t("cancelledFaildMsg")
                      );
                    }
                  }
                }}
                style={{ flex: 1 }}
              >
                <Text
                  style={{
                    color: colors.buttonText,
                    backgroundColor: colors.buttonBackground,
                    paddingVertical: 16,
                    textAlign: "center",
                    borderRadius: 8,
                  }}
                >
                  {i18n.t("confirm")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
