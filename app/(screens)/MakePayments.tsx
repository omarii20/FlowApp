import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { paymentMethods } from "@/constants/data";
import RadioButton from "@/components/ui/RadioButton";
import { router } from "expo-router";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const MakePayments = () => {
  const [selectPayment, setSelectPayment] = useState(0);
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View className="justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButtonAfterLogin title={i18n.t("makePayTitle")} isPushBack={true} />

            <View
              style={{
                borderColor: colors.tint,
                backgroundColor: colors.card,
              }}
              className="p-6 border rounded-xl mt-8"
            >
              <View className="border-b border-dashed pb-4" style={{ borderColor: colors.inputBorder }}>
                <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }} className="flex-row justify-between items-center">
                  <Text style={{ textAlign: isRTL ? "right" : "left", color: colors.text }} className="text-bodyText">{i18n.t("consulting")}</Text>
                  <Text style={{ color: colors.text }} className="text-base">$30.00</Text>
                </View>
                <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }} className="flex-row justify-between items-center py-4">
                  <Text style={{ textAlign: isRTL ? "right" : "left", color: colors.text }} className="text-bodyText">{i18n.t("manipulation")}</Text>
                  <Text style={{ color: colors.text }} className="text-base">$35.00</Text>
                </View>
                <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }} className="flex-row justify-between items-center">
                  <Text style={{ textAlign: isRTL ? "right" : "left", color: colors.text }} className="text-bodyText">{i18n.t("service")}</Text>
                  <Text style={{ color: colors.text }} className="text-base">$20.00</Text>
                </View>
              </View>
              <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }} className="flex-row justify-between items-center pt-4">
                <Text style={{ textAlign: isRTL ? "right" : "left", color: colors.text }} className="font-semibold">{i18n.t("total")}</Text>
                <Text className="font-semibold text-primaryColor text-base">
                  $85.00
                </Text>
              </View>
            </View>

            <View className="pt-6">
              <Text style={{ textAlign: isRTL ? "right" : "left", color: colors.text }} className="text-xl font-semibold">
                {i18n.t("paymentMethods")}
              </Text>
              <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }} className="flex-row flex-wrap gap-4 pt-5">
                {paymentMethods.map(({ name, img }, idx) => (
                  <Pressable
                    onPress={() => setSelectPayment(idx)}
                    key={idx}
                    style={{
                      borderColor: colors.inputBorder,
                      backgroundColor: colors.inputBackground,
                    }}
                    className="w-[45%] justify-center items-center border py-3 rounded-lg"
                  >
                    <View className="p-2 rounded-full bg-white">
                      <Image source={img} />
                    </View>
                    <Text style={{ textAlign: "center", color: colors.text }} className="text-base pt-3 pb-5">{name}</Text>
                    <View>
                      <RadioButton isActive={selectPayment === idx} />
                    </View>
                  </Pressable>
                ))}
                <Pressable
                  onPress={() => router.push("/AddCardPage")}
                  style={{
                    borderColor: colors.inputBorder,
                    backgroundColor: colors.inputBackground,
                  }}
                  className="w-[45%] justify-center items-center border py-3 rounded-lg"
                >
                  <View className="h-10 w-10 justify-center items-center rounded-full bg-primaryColor">
                    <Text className="text-2xl text-white">+</Text>
                  </View>
                  <Text style={{ textAlign: "center", color: colors.tint }} className="text-base pt-3 font-semibold">
                    {i18n.t("addCard")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="w-full pt-6">
            <LinkButton link="/BookingConfirm" text={i18n.t("confirm") + " " + i18n.t("appoinmentTitle")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakePayments;

const styles = StyleSheet.create({});
