import { TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

type PropsType = {
  link?: any;
  text: string;
  onPress?: () => void | Promise<void>;
};

const BookButton = ({ link, text , onPress}: PropsType) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => router.push(link as any)}
      style={[
        styles.button,
        {
          borderColor: colors.tint,
        },
      ]}
    >
      <Text style={{ color: colors.tint, textAlign: "center", fontWeight: "600" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BookButton;

const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    borderBottomWidth:2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,  
  },
});
