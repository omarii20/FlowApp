import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

type PropsType = {
  link: string;
  text: string;
};

const LinkButton = ({ link, text }: PropsType) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => router.push(link as any)}
      style={{
        width: "100%",
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: colors.buttonBackground,
      }}
    >
      <Text
        style={{
          color: colors.buttonText,
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default LinkButton;

const styles = StyleSheet.create({});
