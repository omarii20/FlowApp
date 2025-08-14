import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { doctorSpecialityData2 } from "@/constants/data";
import { Feather } from "@expo/vector-icons";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const DoctorSpecialityPage = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="p-6">
        <HeaderWithBackButtonAfterLogin title="Doctor Speciality" isPushBack={true} />
        <View className="flex-row flex-wrap gap-4 pt-8 pb-16">
          {doctorSpecialityData2.map(({ name, img, totalDoctor }, idx) => (
            <Pressable
              onPress={() => router.push("/TopDoctor")}
              style={{
                borderColor: colors.tint,
                backgroundColor: colors.card,
              }}
              className="w-[45%] border rounded-lg justify-center items-center p-4"
              key={idx}
            >
              <View
                style={{ borderColor: colors.tint }}
                className="p-3 rounded-md border"
              >
                <Image source={img} />
              </View>
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold pt-3"
              >
                {name}
              </Text>
              <Text
                style={{ color: colors.text }}
                className="item-center flex-row text-bodyText pt-1"
              >
                {totalDoctor} doctors{" "}
                <Feather name="arrow-right" size={14} color={colors.icon} />
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorSpecialityPage;

const styles = StyleSheet.create({});
