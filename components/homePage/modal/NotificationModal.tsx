import {Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const sortByOptions = [
  { key: "allTime", label: i18n.t("allTime") },
  { key: "last7Days", label: i18n.t("last7Days") },
  { key: "last1Month", label: i18n.t("last1Month") },
  { key: "last6Months", label: i18n.t("last6Months") },
];

type PropsType = {
  showNotification: boolean;
};

const NotificationModal = ({ showNotification }: PropsType) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortBy, setSortBy] = useState(sortByOptions[0].key);
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <Modal visible={showNotification} animationType="slide">
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={styles.container}>
          <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("notification")} />

          <View
            style={[
              styles.sectionHeader,
              {
                borderBottomColor: colors.border,
                flexDirection: isRTL ? "row-reverse" : "row",
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.text, textAlign: isRTL ? "right" : "left" }]}>
              {i18n.t("latestUpdateText")}
            </Text>

            <View style={{ flexDirection: isRTL ? "row-reverse" : "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: colors.text }}>{i18n.t("filtering")}:</Text>

              <View style={[styles.dropdownContainer, { borderColor: colors.border }]}>
                <Pressable onPress={() => setShowDropdown(!showDropdown)}>
                  <Text style={{ paddingHorizontal: 12, paddingVertical: 8, color: colors.text }}>
                    {i18n.t(sortBy)} <Feather name="chevron-down" size={16} color={colors.text} />
                  </Text>
                </Pressable>

                {showDropdown && (
                  <View style={[styles.dropdown, { backgroundColor: colors.buttonBackground }]}>
                    {sortByOptions.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          setSortBy(item.key);
                          setShowDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItem}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Notifications list */}
          {[
            {
              date: "Today, April 20-2022",
              notifications: [
                {
                  icon: <MaterialCommunityIcons name="close-box" size={24} color={colors.tint} />,
                  title: "Appointment cancelled !",
                  desc: "Never miss a medical appointment with our reliable appointment alarm system!",
                },
                {
                  icon: <FontAwesome name="calendar-check-o" size={24} color={colors.tint} />,
                  title: "New Services Available!",
                  desc: "Explore our expanded range of services for improved health and wellness.",
                },
                {
                  icon: <FontAwesome name="calendar-check-o" size={24} color={colors.tint} />,
                  title: "Schedule Changed!",
                  desc: "Schedule Updated! Please check for changes in your appointments.",
                },
              ],
            },
            {
              date: "Yesterday, April 19-2022",
              notifications: [
                {
                  icon: <Feather name="bell" size={24} color={colors.tint} />,
                  title: "Appointment Success!",
                  desc: "Your appointment has been successfully scheduled. See you then! Stay healthy!",
                },
                {
                  icon: <FontAwesome name="calendar-check-o" size={24} color={colors.tint} />,
                  title: "New Services Available!",
                  desc: "Explore our expanded range of services for improved health and wellness.",
                },
              ],
            },
          ].map((group, gIdx) => (
            <View key={gIdx} style={styles.dateGroup}>
              <Text style={{ color: colors.text, fontWeight: "600", marginBottom: 8 }}>{group.date}</Text>
              {group.notifications.map((item, idx) => (
                <View key={idx} style={[styles.card, { borderColor: colors.border, backgroundColor: colors.card, flexDirection: isRTL ? "row-reverse" : "row" }]}>
                  <View style={[styles.iconContainer, isRTL ? { marginLeft: 12 } : { marginRight: 12 }]}>
                    <View style={[styles.iconBg, { backgroundColor: colors.background }]}>{item.icon}</View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cardTitle, { color: colors.text, textAlign: isRTL ? "right" : "left" }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.cardDesc, { color: colors.text, textAlign: isRTL ? "right" : "left" }]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionHeader: {
    paddingTop: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 8,
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 44,
    right: 0,
    borderRadius: 12,
    paddingVertical: 8,
    width: 140,
    zIndex: 50,
  },
  dropdownItem: {
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dateGroup: {
    paddingTop: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    alignItems: "center",
  },
  iconContainer: {
    padding: 8,
  },
  iconBg: {
    borderRadius: 50,
    padding: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 12,
    marginTop: 4,
  },
});