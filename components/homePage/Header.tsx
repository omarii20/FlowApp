import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import logoImg from "../../assets/images/logo.png";
import { useI18n } from "@/hooks/use18n";

const Header = ({
  setShowNotification,
  setShowFavouriteModal,
}: {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFavouriteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { colors } = useTheme();
  const { isRTL } = useI18n();
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.headerBackground, flexDirection:isRTL?"row-reverse":"row" }]}>
      {/* Notification Button */}
      <TouchableOpacity onPress={() => setShowNotification(true)}>
        <MaterialCommunityIcons name="bell-outline" size={28} color={colors.icon} />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Favorites Button */}
      {/* <TouchableOpacity onPress={() => setShowFavouriteModal(true)}>
        <MaterialCommunityIcons name="heart-outline" size={28} color={colors.icon} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 35,
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#b91c1c",
  },
});
