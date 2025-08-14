import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import {
  Entypo,
  Feather,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import i18n from "@/i18n";

const ChatWithCustomer = () => {
  const [message, setMessage] = useState(false);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ backgroundColor: colors.tint }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 80 }}>
          <HeaderWithBackButtonAfterLogin
            isPushBack={true}
            title={i18n.t('customerService')}
          />
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
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                paddingHorizontal: 32,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: colors.tint,
                borderRadius: 50,
                color: colors.text,
              }}
            >
              10 June, 2023
            </Text>
          </View>

          {/* Example outgoing messages */}
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

          {/* Example incoming messages */}
          <View style={{ marginTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
              <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 8 }}>
                <Feather name="headphones" size={24} color={colors.tint} />
              </View>
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

          <View style={{ marginTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
              <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 8 }}>
                <Feather name="headphones" size={24} color={colors.tint} />
              </View>
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
        </View>
      </ScrollView>

      {/* Input bar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: colors.card,
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: 28,
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        >
          <FontAwesome6 name="face-smile" size={20} color={colors.icon} style={{ marginRight: 8 }} />
          <TextInput
            onFocus={() => setMessage(true)}
            onBlur={() => setMessage(false)}
            placeholder="Message"
            placeholderTextColor={colors.inputBorder}
            multiline
            style={{ flex: 1, maxHeight: 80, color: colors.text }}
          />
          <Foundation name="paperclip" size={24} color={colors.icon} style={{ marginLeft: 8 }} />
        </View>
        <View>
          <View style={{ padding: 12, backgroundColor: colors.tint, borderRadius: 50 }}>
            <Ionicons name="paper-plane-outline" size={20} color="#fff" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatWithCustomer;

const styles = StyleSheet.create({
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
