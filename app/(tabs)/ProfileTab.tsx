import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import profileImg from "@/assets/images/user_img.png";
import { profileSettings } from "@/constants/data";
import { router } from "expo-router";
import CustomSwitch from "@/components/CustomSwitch";
import i18n from "@/i18n";
import { translations } from "@/i18n/translations";
import { useI18n } from "@/hooks/use18n";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export const getTranslationKey = (value: string): string | null => {
  const keys = Object.keys(translations.en);
  for (const key of keys) {
    if ((translations.en as Record<string, string>)[key] === value) {
      return key;
    }
  }
  return null;
};

type AllowedPaths = "/NotificationSettings" | "/LanguageSettings" | "/HelpSupport";

const ProfileTab = () => {
  // ✅ כל ה-hooks בראש, ללא תנאים
  const { user, logout, formatPhoneNumber } = useAuth();
  const { isRTL } = useI18n();
  const { theme, toggleTheme, colors } = useTheme();

  const [logoutModal, setLogoutModal] = useState(false);
  const [profileData, setProfileData] = useState<{ name: string; image: string | null } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.phoneNumber) {
          setProfileLoading(false);
          return;
        }
        const _phoneNumber = formatPhoneNumber(user.phoneNumber);
        const res = await fetch(
          `https://crm.comarkit.com/api/flow/userProfile.php?phoneNumber=${_phoneNumber}`
        );
        const data = await res.json();

        if (data && data.id) {
          const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
          const image = data.image || null;
          setProfileData({ name: fullName, image });
        } else {
          setProfileData({ name: "", image: null });
        }
      } catch (err) {
        console.error("Error fetching profile data", err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.phoneNumber, formatPhoneNumber]);

  const handleLogout = async () => {
    await logout();
    router.replace("/SignIn");
  };

  const onPressFunction = (name: string, link: AllowedPaths) => {
    if (name === "Dark Mode") return;
    router.push(link);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View className="pb-8 px-6">
        {/* Title */}
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            gap: 10,
          }}
          className="pt-6 pb-8"
        >
          <AntDesign name="user" size={24} color={"#009281"} />
          <Text
            style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
            className="text-2xl font-semibold"
          >
            {i18n.t("settings")}
          </Text>
        </View>

        {/* Profile Card */}
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            backgroundColor: colors.card,
          }}
          className="rounded-[20px] p-6 flex flex-row justify-between items-center"
        >
          {profileLoading ? (
            <ActivityIndicator size="small" color={colors.tint} />
          ) : (
            <Image
              source={profileData?.image ? { uri: profileData.image } : profileImg}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
          )}

          <View
            style={{ width: "auto", alignItems: isRTL ? "flex-end" : "flex-start" }}
          >
            <Text style={{ color: colors.text }} className="text-xl font-semibold">
              {profileLoading ? "..." : profileData?.name || i18n.t("noName")}
            </Text>
            <Text style={{ color: colors.text }} className="text-base pt-2">
              {user?.phoneNumber || i18n.t("noPhone")}
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/EditProfile")}
            style={{ backgroundColor: colors.buttonBackground }}
            className="p-3 rounded-full"
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color={colors.buttonText}
            />
          </Pressable>
        </View>

        {/* Options */}
        <View className="pt-2">
          {profileSettings.map(({ id, icon, name, link }) => (
            <Pressable
              key={id}
              className="pt-3"
              onPress={() => onPressFunction(name, link as AllowedPaths)}
            >
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <View
                    style={{ backgroundColor: colors.inputBackground }}
                    className="rounded-full p-3"
                  >
                    <Ionicons name={icon as any} size={24} color="#009281" />
                  </View>
                  <Text style={{ color: colors.text }} className="text-lg font-semibold">
                    {getTranslationKey(name) ? i18n.t(getTranslationKey(name)!) : name}
                  </Text>
                </View>
                {name === "Dark Mode" ? (
                  <CustomSwitch onChange={toggleTheme} value={theme === "dark"} />
                ) : (
                  <Entypo
                    name={isRTL ? "chevron-thin-left" : "chevron-thin-right"}
                    size={20}
                    color={colors.text}
                  />
                )}
              </View>
            </Pressable>
          ))}

          {/* Logout */}
          <Pressable onPress={() => setLogoutModal(true)} className="pt-3">
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 16,
              }}
            >
              <View className="bg-[#ffe9d5] rounded-full p-3">
                <MaterialIcons name="logout" size={20} color="#ff5630" />
              </View>
              <Text style={{ color: "#ff5630" }} className="text-lg font-semibold">
                {i18n.t("logout")}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Logout Modal */}
      <Modal visible={logoutModal} transparent>
        <View
          className="h-full justify-end items-center"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View
            style={{ backgroundColor: colors.card }}
            className="w-full pt-16 px-6 pb-6 rounded-t-[60px]"
          >
            <View className="pb-4 border-b border-dashed border-borderColor">
              <Text style={{ color: "#ff5630" }} className="text-2xl text-center font-semibold">
                {i18n.t("logout")}
              </Text>
            </View>
            <Text style={{ color: colors.text }} className="text-lg pt-4 text-center">
              {i18n.t("logoutMessageSure")}
            </Text>

            <View
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              className="pt-8 flex-row gap-4"
            >
              <Pressable onPress={() => setLogoutModal(false)} className="flex-1">
                <Text
                  style={{
                    color: colors.buttonBackground,
                    borderColor: colors.buttonBackground,
                  }}
                  className="border rounded-lg py-4 bg-secondaryBg text-center font-medium"
                >
                  {i18n.t("cancel")}
                </Text>
              </Pressable>
              <Pressable onPress={handleLogout} className="flex-1">
                <Text
                  style={{
                    backgroundColor: colors.buttonBackground,
                    color: colors.buttonText,
                  }}
                  className="border rounded-lg py-4 text-center font-medium"
                >
                  {i18n.t("logout")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({});
