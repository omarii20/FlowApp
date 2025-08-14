import { FlatList, ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { scheduleDates } from "@/constants/data";
import LinkButton from "@/components/LinkButton";
import CalendarModal from "@/components/ui/CalendarModal";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const Appoinment = () => {
  const [select, setSelect] = useState(0);
  const { i18n, isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-4">
        <HeaderWithBackButtonAfterLogin title={i18n.t("appoinmentTitle")} isPushBack={true} />

        <View className="mt-8 pb-8">
          {/* Header and Calendar */}
          <View
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            className="flex-row justify-between items-center pb-5"
          >
            <Text
              className="text-lg font-semibold"
              style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
            >
              {i18n.t("schedulesText")}
            </Text>
            <CalendarModal />
          </View>

          {/* Dates */}
          <View style={{ borderColor: colors.inputBorder }} className="border rounded-xl p-4">
            <FlatList
              horizontal
              inverted={isRTL}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={scheduleDates}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable
                  className="items-center p-3 rounded-lg"
                  style={{ borderColor: colors.buttonBackground, borderWidth: 1 }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                  >
                    {item.date}
                  </Text>
                  <Text
                    className="text-[12px]"
                    style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                  >
                    {item.day}
                  </Text>
                </Pressable>
              )}
            />
          </View>

          {/* Time slots */}
          <View style={{ borderColor: colors.inputBorder }} className="border rounded-xl p-4 mt-5">
            <FlatList
              horizontal
              inverted={isRTL}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={["10.00Am", "11.00Am", "12.00Pm", "01.00Pm"]}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable
                  className="items-center py-2 px-3 rounded-lg"
                  style={{ borderColor: colors.buttonBackground, borderWidth: 1 }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>

        <View className="w-full pt-8">
          <LinkButton link="/PatientDetails" text={i18n.t("continue")} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
