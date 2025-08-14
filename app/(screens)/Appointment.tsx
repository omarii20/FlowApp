import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbox from "@/components/ui/Searchbox";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import AppointmentsCard from "@/components/ui/AppointmentsCard";
import { topDoctorData } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";

const categoryList = [
  "All",
  "General",
  "Dentist",
  "Nutritionist",
  "Cardiologist",
];

const Appointment = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="pt-6">
        <View className="px-6">
          <HeaderWithBackButtonAfterLogin isPushBack={true} title="Top Doctor" />
        </View>

        <View className="pt-8 px-6 ">
          <Searchbox onSearch={(value: string) => {}} />
        </View>

        <View className="flex-row pt-5 gap-3 pl-6">
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 12 }}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => (
              <Pressable>
                <Text
                  onPress={() => setActiveCategory(index)}
                  className={`text-base border rounded-md py-1 px-3 ${
                    index === activeCategory
                      ? "text-white"
                      : ""
                  }`}
                  style={{
                    borderColor: colors.tint,
                    backgroundColor: index === activeCategory ? colors.tint : "transparent",
                    color: index === activeCategory ? "#fff" : colors.text,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View className="pb-16 px-6">
          {topDoctorData.map(({ ...props }, idx) => (
            <AppointmentsCard {...props} key={idx} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({});
