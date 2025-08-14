import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import profileImg from "@/assets/images/done-profile-img.png";
import profileImg2 from "@/assets/images/chat-reply-img.png";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const ChatBox = () => {
  const [message, setMessage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ backgroundColor: colors.tint }}>
        <View style={[styles.headerWrapper]}>
          <View style={{ flexDirection: "row" }}>
            <HeaderWithBackButtonAfterLogin isPushBack={true} isTextWhite={true} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingLeft: 8 }}>
              <Image source={profileImg} style={{ width: 60, height: 60 }} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
                  Dr. Dianne Johnson
                </Text>
                <Text style={{ color: "#fff" }}>Online</Text>
              </View>
            </View>
          </View>

          <View>
            <Pressable
              onPress={() => setShowMore((prev) => !prev)}
              style={{
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#fff",
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="more-horizontal" size={16} color="white" />
            </Pressable>

            {showMore && (
              <View
                style={{
                  padding: 20,
                  borderRadius: 16,
                  backgroundColor: colors.card,
                  position: "absolute",
                  top: 30,
                  right: 0,
                  width: 200,
                }}
              >
                <Pressable
                  onPress={() => router.push("/AudioCall")}
                  style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
                >
                  <View style={[styles.iconBox, { backgroundColor: colors.inputBackground, borderColor: colors.tint }]}>
                    <Ionicons name="call-outline" size={16} color={colors.tint} />
                  </View>
                  <Text style={{ paddingLeft: 8, color: colors.text }}>Audio Call</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/VideoCall")}
                  style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, borderBottomWidth: 1, borderColor: colors.inputBorder, paddingBottom: 12 }}
                >
                  <View style={[styles.iconBox, { backgroundColor: colors.inputBackground, borderColor: colors.tint }]}>
                    <Feather name="video" size={16} color={colors.tint} />
                  </View>
                  <Text style={{ paddingLeft: 8, color: colors.text }}>Video Call</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/EndChatSession")}
                  style={{ flexDirection: "row", alignItems: "center", paddingTop: 12 }}
                >
                  <View style={[styles.iconBox, { backgroundColor: "#FF5630", borderColor: "#FF5630" }]}>
                    <AntDesign name="delete" size={16} color="white" />
                  </View>
                  <Text style={{ paddingLeft: 8, color: "#FF5630" }}>End Session</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            padding: 24,
            backgroundColor: colors.card,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -48,
            paddingBottom: 80,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "600", paddingHorizontal: 32, paddingVertical: 8, borderWidth: 1, borderColor: colors.tint, borderRadius: 50, color: colors.text }}>
              10 June, 2023
            </Text>
          </View>

          {/* Example messages */}
          <View style={{ marginTop: 32 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
              <View style={{ maxWidth: "85%" }}>
                <Text style={[styles.messageOut, { backgroundColor: "#fff", borderColor: colors.inputBorder, color: colors.text }]}>
                  Hi, good afternoon Dr. Jenny Wilson
                </Text>
                <Text style={[styles.messageOut, { backgroundColor: "#fff", borderColor: colors.inputBorder, color: colors.text, marginTop: 8 }]}>
                  I'm Andrew. I have a problem with my immune system
                </Text>
              </View>
              <View style={{ padding: 4, backgroundColor: colors.tint, borderRadius: 50 }}>
                <Feather name="check" size={12} color="white" />
              </View>
            </View>
          </View>

          {/* Incoming message example */}
          <View style={{ marginTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
              <Image source={profileImg2} />
              <View>
                <Text style={[styles.messageIn, { backgroundColor: colors.tint, color: "#fff" }]}>
                  Hello, good afternoon Andrew
                </Text>
                <Text style={[styles.messageIn, { backgroundColor: colors.tint, color: "#fff", marginTop: 8 }]}>
                  Can you tell me the problem you are having? So that I can identify it
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Input bar */}
      <View style={{ position: "absolute", bottom: 0, right: 0, left: 0, backgroundColor: colors.card, padding: 16, flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ flexDirection: "row" }}>
          {!message ? (
            <>
              <Ionicons name="camera" size={28} color={colors.tint} />
              <MaterialIcons name="image" size={28} color={colors.tint} style={{ marginHorizontal: 4 }} />
              <MaterialCommunityIcons name="microphone" size={28} color={colors.tint} />
            </>
          ) : (
            <Entypo name="chevron-small-right" size={28} color={colors.tint} />
          )}
        </View>
        <View style={{ flex: 1, flexDirection: "row", borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 28, paddingHorizontal: 16, alignItems: "center" }}>
          <FontAwesome6 name="face-smile" size={20} color={colors.icon} style={{ marginRight: 8 }} />
          <TextInput
            onFocus={() => setMessage(true)}
            onBlur={() => setMessage(false)}
            placeholder="Message"
            placeholderTextColor={colors.inputBorder}
            multiline
            style={{ flex: 1, maxHeight: 80, color: colors.text }}
          />
          <Pressable onPress={() => setShowFile((prev) => !prev)}>
            <Foundation name="paperclip" size={24} color={colors.icon} style={{ marginLeft: 8 }} />
          </Pressable>
        </View>
        <View>
          <View style={{ padding: 12, backgroundColor: colors.tint, borderRadius: 50 }}>
            <Ionicons name="paper-plane-outline" size={20} color="#fff" />
          </View>
        </View>
      </View>

      {/* Attach modal */}
      <Modal visible={showFile} transparent>
        <Pressable
          onPress={() => setShowFile(false)}
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 24, paddingBottom: 80, backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <View style={{ flexDirection: "row", backgroundColor: colors.card, borderRadius: 16, padding: 24, width: "100%", justifyContent: "space-between" }}>
            <View style={{ padding: 20, borderRadius: 50, backgroundColor: "#5554db" }}>
              <AntDesign name="filetext1" size={28} color="white" />
            </View>
            <View style={{ padding: 20, borderRadius: 50, backgroundColor: "#F75555" }}>
              <Feather name="image" size={28} color="white" />
            </View>
            <View style={{ padding: 20, borderRadius: 50, backgroundColor: colors.tint }}>
              <Feather name="headphones" size={28} color="white" />
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  iconBox: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
  },
  messageOut: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  messageIn: {
    fontSize: 16,
    padding: 12,
    borderRadius: 12,
  },
});
