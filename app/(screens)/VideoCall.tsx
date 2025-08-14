import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import videoCallBg from "@/assets/images/video-call-bg-img.png";
import { SafeAreaView } from "react-native-safe-area-context";
import frontCamera from "@/assets/images/front-camera.png";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const VideoCall = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="h-full w-full absolute">
        <Image source={videoCallBg} style={{ width: "100%", height: "100%" }} />
      </View>
      <View className="z-10 justify-between items-center h-full p-6">
        <View className=" justify-end items-end w-full">
          <Image source={frontCamera} style={{ borderRadius: 10 }} />
        </View>
        <View>
          <View className="pb-8">
            <Text
              style={{ color: colors.text }}
              className="text-xl font-semibold text-center"
            >
              Dr. Jonny Smith
            </Text>
            <Text style={{ color: colors.text }} className="text-center">
              12:40 mins
            </Text>
          </View>
          <View className="pb-14 flex-row justify-center items-center gap-4">
            <Pressable
              onPress={() => router.push("/EndChatSession")}
              className="p-5 rounded-full"
              style={{ backgroundColor: "#B71D18" }}
            >
              <MaterialIcons name="call-end" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => router.push("/AudioCall")}
              className="py-5 px-6 rounded-full justify-center items-center"
              style={{ backgroundColor: colors.tint }}
            >
              <FontAwesome name="microphone" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoCall;

const styles = StyleSheet.create({});
