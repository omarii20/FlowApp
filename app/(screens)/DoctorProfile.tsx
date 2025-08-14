import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import profileImg from "@/assets/images/doctor-profile-img.png";
import LinkButton from "@/components/LinkButton";
import { useTheme } from "@/context/ThemeContext";

const DoctorProfile = () => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <View className="h-full justify-between items-start w-full">
        <View className="flex-row justify-between items-center pt-6 px-6 w-full">
          <Text
            onPress={() => router.back()}
            style={{ backgroundColor: colors.tint }}
            className="rounded-full p-2"
          >
            <Ionicons name="chevron-back" color={"white"} size={20} />
          </Text>
          <Octicons name="share-android" size={20} color={colors.text} />
        </View>

        <View className="w-full">
          <View className="-mt-16">
            <Image source={profileImg} />
          </View>
          <View
            style={{ backgroundColor: colors.tint }}
            className="rounded-t-3xl p-6 -mt-20"
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-semibold text-2xl" style={{ color: colors.buttonText }}>
                  Dr. Dianne Johnson
                </Text>
                <Text className="pt-1 text-base" style={{ color: colors.buttonText }}>
                  Gynecologist
                </Text>
              </View>
              <View>
                <Text className="bg-white p-[10px] rounded-md">
                  <AntDesign name="heart" size={16} color={colors.tint} />
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center pt-4 pb-10">
              {[
                { label: "Patient", value: "520" },
                { label: "Years experience", value: "10+" },
                { label: "Reviews", value: "60+" },
              ].map((item, idx) => (
                <View className="flex-row gap-2" key={idx}>
                  <Text className="p-2 rounded-md bg-white">
                    <MaterialIcons name="people-outline" size={16} color={colors.tint} />
                  </Text>
                  <View>
                    <Text className="text-xs" style={{ color: colors.buttonText }}>
                      {item.label}
                    </Text>
                    <Text className="text-xs font-semibold" style={{ color: colors.buttonText }}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{ backgroundColor: colors.card }}
            className="p-6 rounded-t-2xl -mt-10"
          >
            <Text className="text-xl font-semibold" style={{ color: colors.text }}>
              About Doctor
            </Text>
            <Text
              className="py-5"
              style={{ color: colors.text }}
            >
              Dr. Dianne Johnson is a dedicated gynecologist committed to
              women's health and well-being. With expertise in obstetrics and
              gynecology, she provides compassionate care, emphasizing
              preventive measures and personalized treatment.
            </Text>

            <LinkButton link="/Appoinment" text="Make an appoinment" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({});
