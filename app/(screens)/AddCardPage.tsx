import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import addCardImg from "@/assets/images/add-card.png";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const AddCardPage = () => {
  const [checked, setChecked] = useState(false);
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <ScrollView>
        <View className="justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButtonAfterLogin
              title={i18n.t("addCard")}
              isPushBack={true}
            />
            <View className="pt-6 justify-center items-center">
              <Image
                source={addCardImg}
                style={{ width: "100%", height: 160, resizeMode: "contain" }}
              />
            </View>
            <View className="pt-6">
              <FormField
                placeholder="Amin Smith"
                name={i18n.t("cardHolderName")} value={""} onChangeText={function (text: string): void {
                  throw new Error("Function not implemented.");
                } }              />
            </View>
            <View className="pt-6">
              <FormField
                placeholder="****** 456456"
                name={i18n.t("cardNumber")}
                keyboardType="phone-pad" value={""} onChangeText={function (text: string): void {
                  throw new Error("Function not implemented.");
                } }              />
            </View>
            <View className="pt-6 flex-row w-full gap-3">
              <View className="flex-1">
                <FormField
                  placeholder="MM/YY"
                  name={i18n.t("expDate")}
                  keyboardType="phone-pad" value={""} onChangeText={function (text: string): void {
                    throw new Error("Function not implemented.");
                  } }                />
              </View>
              <View className="flex-1">
                <FormField
                  placeholder="***"
                  name={i18n.t("cvcCode")}
                  keyboardType="phone-pad" value={""} onChangeText={function (text: string): void {
                    throw new Error("Function not implemented.");
                  } }                />
              </View>
            </View>
            <View className="pt-6">
              <FormField
                placeholder={i18n.t("country")}
                name={i18n.t("country")} value={""} onChangeText={function (text: string): void {
                  throw new Error("Function not implemented.");
                } }              />
            </View>
            <View
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              className="flex justify-start items-center w-full pt-2 pb-7"
            >
              <Text
                className="text-base pl-2"
                style={{ color: colors.text, textAlign: isRTL ? "right" : "left" }}
              >
                {i18n.t("setAsDefaultPayment")}
              </Text>
            </View>
          </View>

          <View className="w-full">
            <LinkButton link="/Home" text={i18n.t("addCard")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCardPage;

const styles = StyleSheet.create({});
