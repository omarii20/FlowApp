import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";
import fb from "../../assets/images/fb.png";
import google from "../../assets/images/google.png";
import apple from "../../assets/images/apple.png";
import { router } from "expo-router";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

const SignUp = () => {
  // const [checked, setChecked] = useState(false);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView>
        <View
          style={{flexGrow: 1,paddingHorizontal: 24, marginVertical: 32}}
          className="w-full justify-start items-center"
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text, textAlign: "center" }}>
            {i18n.t("createAccText")}
          </Text>
          <Text style={{ fontSize: 14, color: colors.placeholder, textAlign: "center", paddingTop: 12 }}>
            {i18n.t("signUpMeesage")}
          </Text>

          <View style={{ width: "100%", paddingTop: 32 }}>
            <FormField name="Email" placeholder={i18n.t("email")} value={""} onChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            } } />
            <FormField name="Password" placeholder="*******" otherStyle="mt-4" value={""} onChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            } } />
            <FormField name="Confirm Password" placeholder="*******" otherStyle="mt-4" value={""} onChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            } } />
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingTop: 8, paddingBottom: 28 }}
          >
            <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 8 }}>
              {i18n.t("rememberPasswordText")}
            </Text>
          </View>

          <LinkButton link="/SignIn" text="Sign Up" />

          <View style={{ paddingTop: 32 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.text, textAlign: "center" }}>
              {i18n.t("continueWithText")}
            </Text>

            <View style={{ flexDirection: "row", gap: 16, paddingTop: 32, justifyContent: "center", alignItems: "center" }}>
              {[fb, google, apple].map((icon, idx) => (
                <View
                  key={idx}
                  style={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 9999,
                    padding: 12,
                  }}
                >
                  <Image source={icon} />
                </View>
              ))}
            </View>

            <View style={{ paddingTop: 16 }}>
              <Text style={{ fontSize: 16, color: colors.placeholder, textAlign: "center" }}>
                {i18n.t("alreadyHaveAccText")}
                <Text
                  style={{ color: colors.tint, fontWeight: "bold" }}
                  onPress={() => router.push("/SignIn")}
                >
                  {" "}{i18n.t("login")}
                </Text>
                {i18n.t("here")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
