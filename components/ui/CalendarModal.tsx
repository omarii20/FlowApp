import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const CalendarModal = () => {
  const { locale, isRTL, i18n } = useI18n();
  const { colors } = useTheme();
``
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    dayjs.locale(locale === "he" ? "he" : locale === "ar" ? "ar" : "en");
  }, [locale]);

  const currentMonth = dayjs().format("MMMM-YYYY");

  return (
    <View>
      <Pressable onPress={() => setShowCalendar(true)}>
        <View
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          className="justify-end items-center flex-row gap-2"
        >
          <Text style={{ color: colors.text }}>{currentMonth}</Text>
          <Text
            style={{ backgroundColor: colors.card }}
            className="p-1 rounded-full"
          >
            <Entypo
              name={isRTL ? "chevron-small-left" : "chevron-small-right"}
              size={24}
              color={colors.tint}
            />
          </Text>
        </View>
      </Pressable>

      <Modal transparent visible={showCalendar} animationType="fade">
        <View
          className="flex justify-center items-center h-full"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View
            style={{ backgroundColor: colors.card }}
            className="h-[400px] w-[80%] justify-center items-center rounded-xl"
          >
            <Pressable
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                zIndex: 20,
              }}
              onPress={() => setShowCalendar(false)}
            >
              <Text
                style={{ backgroundColor: colors.background }}
                className="p-2 rounded-full"
              >
                <AntDesign name="close" size={20} color={colors.tint} />
              </Text>
            </Pressable>
            <View className="w-full px-4">
              <Calendar
                onDayPress={(day: any) => {
                  setSelected(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                theme={{
                  backgroundColor: colors.card,
                  calendarBackground: colors.card,
                  textSectionTitleColor: colors.text,
                  selectedDayBackgroundColor: colors.tint,
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: colors.tint,
                  dayTextColor: colors.text,
                  textDisabledColor: colors.inputBorder,
                  monthTextColor: colors.text,
                  arrowColor: colors.tint,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
