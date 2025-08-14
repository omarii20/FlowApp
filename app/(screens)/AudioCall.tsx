import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "@/assets/images/session-end-img.png";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import bgGradient from "@/assets/images/audip_call_gradient.png";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const AudioCall = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="h-full justify-between items-center">
        <Image
          source={bgGradient}
          style={{ width: "100%", height: "100%" }}
          className="absolute inset-0"
        />
        <View className="py-8 justify-center items-center z-10">
          <View>
            <Image source={profileImg} />
          </View>
          <Text style={{ color: colors.text }} className="text-xl font-semibold pt-5">
            Dr. Dianne Johnson
          </Text>
          <Text style={{ color: colors.text }} className="pt-2">
            Ringing...
          </Text>
        </View>

        <View className="pb-14 flex-row justify-center items-center gap-4 z-10">
          <Pressable
            onPress={() => router.push("/EndChatSession")}
            className="p-5 rounded-full"
            style={{ backgroundColor: colors.ButtonsCanceled }}
          >
            <MaterialIcons name="call-end" size={24} color="white" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/VideoCall")}
            className="p-5 rounded-full"
            style={{ backgroundColor: colors.buttonBackground }}
          >
            <Feather name="video" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AudioCall;

const styles = StyleSheet.create({});
