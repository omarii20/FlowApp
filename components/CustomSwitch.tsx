import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

type CustomSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const CustomSwitch = ({ value, onChange }: CustomSwitchProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onChange(!value)}
      style={{ width: 50, height: 28, justifyContent: "center" }}
    >
      <View
        style={{
          backgroundColor: value ? colors.tint : colors.inputBorder,
          height: 28,
          width: 50,
          borderRadius: 28 / 2,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 1,
          left: value ? 26 : 1,
          height: 26,
          width: 26,
          borderRadius: 13,
          backgroundColor: colors.buttonText,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});
