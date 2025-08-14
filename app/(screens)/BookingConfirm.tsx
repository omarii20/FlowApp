import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { Feather } from "@expo/vector-icons";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import profileImg from "@/assets/images/user_img.png"

const BookingConfirm = () => {
  const { isRTL } = useI18n();
  const { colors } = useTheme();
  const { user, formatPhoneNumber } = useAuth() as any;

  const { course_id, name, medicalName, availableTime, date, image } = useLocalSearchParams<{
      course_id: string;
      name: string;
      medicalName: string;
      date: string;
      availableTime: string;
      image: string;
    }>();
    const handleConfirm = async () => {
      try {
        const phone = formatPhoneNumber(user?.phoneNumber || ""); // 050xxxxxxx
        if (!course_id || !phone) {
          Alert.alert(i18n.t("error"), i18n.t("bookingFailed"));
          return;
        }
    
        // תיקון ה־URL (הסרתי את ה־// הכפול)
        const url = `https://crm.comarkit.com/api/flow/booking.php?course_id=${course_id}&phoneNumber=${phone}`;
    
        const res = await fetch(url, { method: "GET" });
        const json = await res.json();
    
        const msg = bookingMessageFromResponse(json);
    
        if (json?.success) {
          Alert.alert(i18n.t("success"), msg, [
            { text: i18n.t("ok"), onPress: () => router.replace("/(tabs)/Home") },
          ]);
        } else {
          Alert.alert(i18n.t("error"), msg);
        }
      } catch (error) {
        console.error("❌ Booking failed:", error);
        Alert.alert(i18n.t("error"), i18n.t("bookingFailed"));
      }
    };
    
    const bookingMessageFromResponse = (json: any) => {
      if (json?.success) return i18n.t("bookingCreated");   
      const err = (json?.error || "").toLowerCase();
    
      if (err.includes("already booked")) return i18n.t("bookingAlreadyBooked");
      if (err.includes("class is full"))  return i18n.t("bookingClassFull");  
    
      return i18n.t("bookingFailed"); 
    };
    

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View className="justify-between items-start h-full">
        <View className="w-full p-6">
          <HeaderWithBackButtonAfterLogin isPushBack={true} />

          <View className="justify-center items-center pt-4">
            <Text className="p-6 rounded-full bg-primaryColor">
              <Feather name="check" size={40} color="white" />
            </Text>
            <Text
              className="text-2xl font-semibold pt-4"
              style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
            >
              {i18n.t("BookingConfirm")}
            </Text>
            <Text
              className="text-bodyText pt-3 text-center"
              style={{ textAlign: isRTL ? "right" : "center", color: colors.text, fontSize:16 }}
            >
              {i18n.t('registerdDoneMessage')}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: colors.card }} className="w-full p-6 rounded-3xl">
          <View
            style={[styles.boxShadow, { backgroundColor: colors.card }]}
            className="p-5 rounded-3xl -mt-40 mb-8"
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                borderColor: colors.inputBorder,
              }}
              className="flex-row justify-start items-center pt-3 pb-8 border-b border-dashed"
            >
              <Image
                source={image ? { uri: image } : profileImg}
                defaultSource={profileImg} // iOS only
                onError={(e) =>
                  console.log("🛑 Image failed to load:", e.nativeEvent.error)
                }
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />

              <View style={{ marginLeft: isRTL ? 0 : 16, marginRight: isRTL ? 16 : 0 }}>
                <Text style={{ color: colors.text }} className="text-xl font-semibold">{name}</Text>
              </View>
            </View>

            <View className="pt-8 gap-3">
              <View
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                className="flex-row justify-between items-center"
              >
                <Text style={{ color: colors.text }} className="text-bodyText">
                  {i18n.t("fullName")}:
                </Text>
                <Text style={{ color: colors.text }} className="text-sm font-semibold">{name}</Text>
              </View>

              <View
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                className="flex-row justify-between items-center"
              >
                <Text style={{ color: colors.text }} className="text-bodyText">
                  {i18n.t("time")}:
                </Text>
                <Text style={{ color: colors.text }} className="text-sm font-semibold">
                  {availableTime}
                </Text>
              </View>

              <View
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                className="flex-row justify-between items-center"
              >
                <Text style={{ color: colors.text }} className="text-bodyText">
                  {i18n.t("date")}:
                </Text>
                <Text style={{ color: colors.text }} className="text-sm font-semibold">{date}</Text>
              </View>
            </View>
          </View>

          <View className="w-full">
            <TouchableOpacity onPress={handleConfirm}>
              <View
                style={{
                  backgroundColor: colors.tint,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                  {i18n.t("ok")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookingConfirm;

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});
