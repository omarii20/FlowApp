import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";

const CustomerServiceStart = () => {
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 24 }}>
          <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("customerService")} />

          <View style={{ paddingTop: 32 }}>
            <View>
              <FormField placeholder={i18n.t("fullName")} name={i18n.t("fullName")} value={""} onChangeText={function (text: string): void {
                throw new Error("Function not implemented.");
              } } />
            </View>
            <View style={{ paddingTop: 16 }}>
              <FormField
                placeholder={i18n.t("phoneNumber")}
                name={i18n.t("phoneNumber")}
                keyboardType="phone-pad" value={""} onChangeText={function (text: string): void {
                  throw new Error("Function not implemented.");
                } }              />
            </View>

            <View style={{ paddingTop: 24 }}>
              <Text
                style={{
                  textAlign: isRTL ? "right" : "left",
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text,
                  paddingBottom: 12,
                }}
              >
                {i18n.t("whatProblem")}
              </Text>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: colors.inputBorder,
                  backgroundColor: colors.inputBackground,
                }}
              >
                <TextInput
                  multiline
                  placeholder={i18n.t("whatProblem")}
                  placeholderTextColor={colors.inputBorder}
                  numberOfLines={5}
                  style={{
                    textAlignVertical: "top",
                    color: colors.text,
                  }}
                />
              </View>
            </View>

            <View style={{ paddingTop: 32 }}>
              <LinkButton link="/ChatWithCustomer" text={i18n.t("messageSend")} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerServiceStart;

const styles = StyleSheet.create({});
