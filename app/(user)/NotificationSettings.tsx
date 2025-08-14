import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "@/components/CustomSwitch";
import i18n from "@/i18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/hooks/use18n";
import { useNotificationSettings } from "@/context/NotificationContext";

const NotificationSettings = () => {
  const { colors } = useTheme();
  const { isRTL } = useI18n();

  // 🎯 סטייט לכל טוגל
  const { notificationsEnabled, toggleNotifications } = useNotificationSettings();
  // const [soundEnabled, setSoundEnabled] = useState(false);
  // const [vibrateEnabled, setVibrateEnabled] = useState(false);
  // const [newTipsEnabled, setNewTipsEnabled] = useState(true);
  // const [newServiceEnabled, setNewServiceEnabled] = useState(false);
  
  const items = [
    {
      label: i18n.t("notifications"),
      value: notificationsEnabled,
      onChange: () => toggleNotifications(),
    },
    // {
    //   label: i18n.t("sound"),
    //   value: soundEnabled,
    //   onChange: () => setSoundEnabled((prev) => !prev),
    // },
    // {
    //   label: i18n.t("vibrate"),
    //   value: vibrateEnabled,
    //   onChange: () => setVibrateEnabled((prev) => !prev),
    // },
    // {
    //   label: i18n.t("newTips"),
    //   value: newTipsEnabled,
    //   onChange: () => setNewTipsEnabled((prev) => !prev),
    // },
    // {
    //   label: i18n.t("newService"),
    //   value: newServiceEnabled,
    //   onChange: () => setNewServiceEnabled((prev) => !prev),
    // },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 24 }}>
          <HeaderWithBackButtonAfterLogin
            isPushBack={true}
            title={i18n.t("manageNotification").split(" ")[1]}
          />

          <View
            style={{
              marginTop: 32,
              padding: 24,
              borderWidth: 1,
              borderColor: colors.inputBorder,
              backgroundColor: colors.card,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: colors.tint,
                fontSize: 16,
                fontWeight: "600",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {i18n.t("manageNotification")}
            </Text>

            {items.map((item, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: idx !== items.length - 1 ? 1 : 0,
                  borderBottomColor: colors.inputBorder,
                }}
              >
                <Text
                  style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}
                >
                  {item.label}
                </Text>
                <CustomSwitch value={item.value} onChange={item.onChange} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettings;
