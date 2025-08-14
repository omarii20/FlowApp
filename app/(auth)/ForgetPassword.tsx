import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

const ForgetPassword = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{i18n.t("forgetPassText")}</Text>
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>
            {i18n.t("resetPAssMessage")}
          </Text>

          <View style={styles.formContainer}>
            <FormField name="Email" placeholder={i18n.t("email")} />
          </View>

          <LinkButton link="/VerifyOTP" text={i18n.t("sendOTP")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    width: "100%",
    justifyContent: "flex-start",
    minHeight: "85%",
    paddingHorizontal: 24,
    marginVertical: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 8,
  },
  formContainer: {
    width: "100%",
    paddingTop: 32,
    paddingBottom: 80,
  },
});
