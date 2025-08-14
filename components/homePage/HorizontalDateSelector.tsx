
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Animated,
  Vibration,
  StyleSheet,
  Dimensions,
} from "react-native";
import dayjs from "dayjs";
import { AntDesign } from "@expo/vector-icons";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const ITEM_WIDTH = 70;
const ITEM_MARGIN = 5;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

interface Props {
    activeDate: string;
    onDateSelect: (date: string) => void;
    appointments: any[];
}

const HorizontalDateSelector = ({
    activeDate,
    onDateSelect,
    appointments,
}: Props) => {
    const { isRTL, locale } = useI18n();
    const { colors } = useTheme();
    const [selectedDate, setSelectedDate] = useState(activeDate);
    const listRef = useRef<FlatList<any>>(null);
    const monthFadeAnim = useRef(new Animated.Value(1)).current;
    const leftArrowScale = useRef(new Animated.Value(1)).current;
    const rightArrowScale = useRef(new Animated.Value(1)).current;
    const dateScale = useRef(new Animated.Value(1)).current;
    const skipInitialScrollRef = useRef(false);

    const days = React.useMemo(() => {
      const startOfMonth = dayjs(selectedDate).startOf("month");
      const daysInMonth = startOfMonth.daysInMonth();
      return Array.from({ length: daysInMonth }, (_, i) =>
        startOfMonth.add(i, "day").format("YYYY-MM-DD")
      );
    }, [selectedDate, locale]);

    const monthTitle = React.useMemo(() => {
      return dayjs(selectedDate).format("MMMM YYYY");
    }, [selectedDate, locale]);

  // גלילה לתאריך הנבחר בתחילה
  useEffect(() => {
    const index = days.findIndex((day) => day === selectedDate);
    if (index !== -1 && !skipInitialScrollRef.current) {
      const scrollWidth = TOTAL_ITEM_WIDTH * 30;
      const itemWidth = ITEM_WIDTH * (index+1);   
      const listWidth = Dimensions.get("window").width;
      const offset = (scrollWidth - itemWidth);
      // console.log("scrollWidth "+scrollWidth)
      // console.log("itemWidth "+ itemWidth)
      // console.log("listWidth " + listWidth)
      // console.log(offset)
      // console.log(offset-(TOTAL_ITEM_WIDTH*2)-(ITEM_MARGIN*2))
      setTimeout(() => {
        listRef.current?.scrollToOffset({
          offset: Math.max(0, offset-(TOTAL_ITEM_WIDTH*2)-(ITEM_MARGIN*2)),
          animated: true,
        });
      }, 200);
    }
  }, [days, selectedDate]);  

  const handleDatePress = (date: string) => {
    skipInitialScrollRef.current = true;
    setSelectedDate(date);
    onDateSelect(date);

    // אפס את הדגל לאחר הגלילה
    setTimeout(() => {
      skipInitialScrollRef.current = false;
    }, 300);
  };

  
  const changeMonth = (direction: number, scaleAnim: Animated.Value) => {
    Vibration.vibrate([3, 7]);

    Animated.timing(scaleAnim, {
      toValue: 0.85,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      const newDay = dayjs(selectedDate).add(direction, "month").startOf("month");
      const newDate = newDay.format("YYYY-MM-DD");

      setSelectedDate(newDate);
      onDateSelect(newDate);

      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: 0,
          viewPosition: -30,
          animated: true,
        });      

        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }, 300);
    });
  };

  return (
    <View className="containerLtr">
      <View
        className="flex-row items-center justify-between py-6 px-4"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <Animated.View style={{ transform: [{ scale: rightArrowScale }] }}>
          <Pressable style={styles.arows} onPress={() => changeMonth(-1, rightArrowScale)}>
            <AntDesign name={isRTL ? "arrowright" : "arrowleft"} size={24} color={colors.text} />
          </Pressable>
        </Animated.View>

        <Animated.Text
          className="text-lg font-semibold text-center"
          style={{ opacity: monthFadeAnim, color: colors.text }}
        >
          {monthTitle}
        </Animated.Text>

        <Animated.View style={{ transform: [{ scale: leftArrowScale }] }}>
          <Pressable style={styles.arows} onPress={() => changeMonth(1, leftArrowScale)}>
            <AntDesign name={isRTL ? "arrowleft" : "arrowright"} size={24} color={colors.text} />
          </Pressable>
        </Animated.View>
      </View>

      <FlatList
        ref={listRef}
        data={days}
        inverted={isRTL}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: TOTAL_ITEM_WIDTH,
          offset: TOTAL_ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={days.findIndex((day) => day === selectedDate)}
        renderItem={({ item, index }) => {
          const isSelected = item === selectedDate;
          const isPastDate = dayjs(item).isBefore(dayjs(), "day");
          const hasLessons = appointments.some(
            (a) => dayjs(a.date).format("YYYY-MM-DD") === item
          );

          return (
            <Pressable onPress={() => handleDatePress(item)}>
              <Animated.View
                style={{
                  width: ITEM_WIDTH,
                  borderRadius: 10,
                  paddingVertical: 10,
                  alignItems: "center",
                  backgroundColor: isSelected ? colors.tint : colors.inputBackground,
                  marginHorizontal: ITEM_MARGIN,
                  opacity: isPastDate && !isSelected ? 0.6 : 1,
                  transform: [{ scale: isSelected ? dateScale : 1 }],
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: isSelected ? colors.buttonText : colors.text,
                  }}
                >
                  {dayjs(item).format("DD")}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isSelected ? colors.buttonText : colors.text,
                  }}
                >
                  {dayjs(item).format("ddd")}
                </Text>
                <View style={styles.dotWrapper}>
                  {hasLessons && (
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: isSelected ? colors.buttonText : colors.tint },
                      ]}
                    />
                  )}
                </View>
              </Animated.View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default HorizontalDateSelector;

const styles = StyleSheet.create({
  dotWrapper: {
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2196F3",
  },
  arows: {
    width : 60, 
    justifyContent:'center', 
    alignItems:"center"
  }
});