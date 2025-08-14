import {
  Image,
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
import profileImg from "@/assets/images/session-end-img.png";
import { AntDesign } from "@expo/vector-icons";
import RadioButton from "@/components/ui/RadioButton";
import LinkButton from "@/components/LinkButton";
import { useTheme } from "@/context/ThemeContext";

const WriteReview = () => {
  const [isRecommend, setIsRecommend] = useState(true);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="p-6">
        <View>
          <HeaderWithBackButtonAfterLogin isPushBack={true} title="Write a Review" />
        </View>

        <View
          className="justify-center items-center pt-12 pb-8 border-b border-dashed"
          style={{ borderColor: colors.inputBorder }}
        >
          <Image source={profileImg} />
          <Text style={{ color: colors.text }} className="text-xl pt-8 text-center font-semibold">
            How was your experience with Dr. Dianne Johnson
          </Text>
          <View className="flex-row gap-3 pt-4 ">
            <AntDesign name="star" size={24} color={colors.tint} />
            <AntDesign name="star" size={24} color={colors.tint} />
            <AntDesign name="star" size={24} color={colors.tint} />
            <AntDesign name="star" size={24} color={colors.tint} />
            <AntDesign name="staro" size={24} color={colors.tint} />
          </View>
        </View>

        <View className="pt-6">
          <View className="flex-row justify-between items-center pb-3">
            <Text style={{ color: colors.text }} className="text-base font-semibold">
              Write your review
            </Text>
            <Text style={{ color: colors.icon }} className="text-xs">
              Max 250 words
            </Text>
          </View>
          <View
            className="px-4 py-3 border rounded-xl w-full"
            style={{ borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }}
          >
            <TextInput
              multiline
              placeholder="Write your review"
              placeholderTextColor={colors.icon}
              numberOfLines={5}
              style={{ textAlignVertical: "top", color: colors.text }}
            />
          </View>
        </View>

        <View className="pt-8">
          <Text style={{ color: colors.text }} className="text-base font-medium">
            Would you recommend Dr. Marvin to your friends?
          </Text>
          <View className="flex-row justify-start items-start pt-4 gap-4">
            <Pressable
              onPress={() => setIsRecommend(true)}
              className="flex-row justify-start items-center"
            >
              <RadioButton isActive={isRecommend} />
              <Text style={{ color: colors.text }} className="pl-2">Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsRecommend(false)}
              className="flex-row justify-start items-center"
            >
              <RadioButton isActive={!isRecommend} />
              <Text style={{ color: colors.text }} className="pl-2">No</Text>
            </Pressable>
          </View>
        </View>

        <View className="w-full pt-10 pb-20">
          <LinkButton link="/Home" text="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({});
