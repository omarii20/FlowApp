import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

type PropsTypes = {
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  isPushBack?: boolean;
  isTextWhite?: boolean;
};

const HeaderWithBackButtonAfterLogin = ({
  setModal,
  title,
  isPushBack = true,
  isTextWhite = false,
}: PropsTypes) => {
  const { colors } = useTheme();
  const { isRTL } = useI18n();

  return (
    <View
      style={{
        flexDirection: isRTL ? "row-reverse" : "row",
        alignItems: "center",
        paddingTop: 16,
        paddingHorizontal: 6,
      }}
    >
      {setModal && (
        <Pressable
          onPress={() => setModal(false)}
          style={{
            backgroundColor: colors.tint,
            borderRadius: 999,
            padding: 8,
          }}
        >
          <Ionicons
            name={isRTL ? "chevron-forward" : "chevron-back"}
            color={"white"}
            size={20}
          />
        </Pressable>
      )}

      {isPushBack && (
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: isTextWhite ? colors.card : colors.tint,
            borderRadius: 999,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={isRTL ? "chevron-forward" : "chevron-back"}
            color={isTextWhite ? colors.tint : "white"}
            size={24}
          />
        </Pressable>
      )}

      {title && (
        <Text
          style={{
            textAlign: isRTL ? "right" : "left",
            marginHorizontal: 12,
            flexShrink: 1,
            fontSize: 20,
            fontWeight: "600",
            color: isTextWhite ? "#fff" : colors.text,
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default HeaderWithBackButtonAfterLogin;

const styles = StyleSheet.create({});