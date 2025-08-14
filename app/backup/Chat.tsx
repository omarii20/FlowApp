// This file have to be inside app/(tabs)/Chat.tsx
// It is currently not in use.

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
import { router } from "expo-router";
import Searchbox from "@/components/ui/Searchbox";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { friendChatList } from "@/constants/data";

const Chat = () => {
  return (
      <ScrollView>
        <View className="px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <AntDesign name="message1" size={24} color="#009281" />
            <Text className="text-2xl font-semibold">Message</Text>
          </View>
          <View className="pt-8">
            <Searchbox />
          </View>
          <View className="py-8 gap-4">
            {friendChatList.map(({ id, img, name, message }) => (
              <Pressable
                onPress={() => router.push("/ChatBox")}
                key={`key:${id}`}
                className="p-4 border border-borderColor rounded-2xl flex flex-row justify-between items-start"
              >
                <View className="flex flex-row justify-start items-center gap-4">
                  <Image source={img} style={{ height: 50, width: 50 }} />
                  <View>
                    <Text className="text-base font-semibold">{name}</Text>
                    <Text className=" pt-1">{message}</Text>
                  </View>
                </View>

                <View className="p-2 rounded-md bg-primaryColor">
                  <Ionicons
                    name="chatbubbles-outline"
                    size={16}
                    color="white"
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
