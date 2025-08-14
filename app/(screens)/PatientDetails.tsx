import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const PatientDetails = () => {
  const [selectAge, setSelectAge] = useState(0);
  const [activeGenter, setActiveGender] = useState(i18n.t("male"));
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View className="justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButtonAfterLogin title={i18n.t("patientDetailsTitle")} isPushBack={true} />

            <View className="pt-8">
              <FormField placeholder={i18n.t("fullName")} name={i18n.t("fullName")} value={""} onChangeText={function (text: string): void {
                throw new Error("Function not implemented.");
              } } />

              <View className="pt-6">
                <Text
                  className="text-base font-medium"
                  style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                >
                  {i18n.t("selectAgeText")} *
                </Text>

                <View
                  style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  className="justify-between items-center flex-row gap-3 pt-3"
                >
                  {["20", "30", "40", "50", "60"].map((item, idx) => (
                    <Text
                      onPress={() => setSelectAge(idx)}
                      key={idx}
                      style={{
                        borderColor: colors.tint,
                        backgroundColor: selectAge === idx ? colors.tint : "transparent",
                        color: selectAge === idx ? "#fff" : colors.tint,
                      }}
                      className={`border rounded-md py-2 flex-1 font-medium text-center`}
                    >
                      {item}+
                    </Text>
                  ))}
                </View>
              </View>

              <View style={{ flexDirection: isRTL ? "row" : "row-reverse" }} className="pt-6">
                <FormField
                  placeholder={i18n.t("phoneNumber")}
                  name={i18n.t("phoneNumber")}
                  keyboardType="phone-pad" value={""} onChangeText={function (text: string): void {
                    throw new Error("Function not implemented.");
                  } }                />
              </View>

              <View className="mt-6">
                <Text
                  className="text-base font-semibold pb-3"
                  style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                >
                  {i18n.t("genderText")}
                </Text>
                <View
                  style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  className="flex-row gap-4 justify-between items-center w-full"
                >
                  {[i18n.t("male"), i18n.t("female")].map((item, idx) => (
                    <Pressable
                      className="flex-1"
                      onPress={() => setActiveGender(item)}
                      key={idx}
                    >
                      <Text
                        style={{
                          textAlign: isRTL ? "right" : "left",
                          backgroundColor: item === activeGenter ? colors.tint : "transparent",
                          color: item === activeGenter ? "#fff" : colors.tint,
                          borderColor: colors.tint,
                        }}
                        className={`text-center py-2 px-8 rounded-lg border text-base font-medium`}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="pt-6">
                <Text
                  className="text-base font-semibold pb-3"
                  style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                >
                  {i18n.t("whatProblem")}
                </Text>
                <View
                  style={{
                    borderColor: colors.inputBorder,
                    backgroundColor: colors.inputBackground,
                  }}
                  className="px-4 py-3 border rounded-xl w-full"
                >
                  <TextInput
                    multiline={true}
                    placeholder={i18n.t("whatProblem")}
                    placeholderTextColor={colors.icon}
                    numberOfLines={5}
                    style={{
                      textAlignVertical: "top",
                      textAlign: isRTL ? "right" : "left",
                      color: colors.text,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="w-full pt-6">
            <LinkButton link="/MakePayments" text={i18n.t("continue")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({});
