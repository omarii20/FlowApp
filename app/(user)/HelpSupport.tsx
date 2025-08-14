import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import i18n from "@/i18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";

const HelpSupport = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 24 }}>
          <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("helpSupport")} />

          <View
            style={{
              marginTop: 32,
              padding: 24,
              borderWidth: 1,
              borderColor: colors.tint,
              backgroundColor: colors.card,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.tint }}>
              {i18n.t("manageNotification")}
            </Text>

            <Pressable
              onPress={() => router.push("/FaqPage")}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 24,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.inputBorder,
                borderStyle: "dashed",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                {i18n.t("faq")}
              </Text>
              <View style={{ backgroundColor: colors.tint, borderRadius: 100, padding: 6 }}>
                <Ionicons name="chevron-forward" color={colors.buttonText} size={20} />
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/CustomerServiceStart")}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.inputBorder,
                borderStyle: "dashed",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                {i18n.t("contactUs")}
              </Text>
              <View style={{ backgroundColor: colors.tint, borderRadius: 100, padding: 6 }}>
                <Ionicons name="chevron-forward" color={colors.buttonText} size={20} />
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/LegalPolicies")}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                {i18n.t("termsAndConditions")}
              </Text>
              <View style={{ backgroundColor: colors.tint, borderRadius: 100, padding: 6 }}>
                <Ionicons name="chevron-forward" color={colors.buttonText} size={20} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({});
