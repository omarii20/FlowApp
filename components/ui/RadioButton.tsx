import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const RadioButton = ({ isActive }: { isActive: boolean }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.outerCircle,
        {
          borderColor: isActive ? colors.tint : colors.inputBorder,
        },
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          {
            backgroundColor: isActive ? colors.tint : "transparent",
            borderColor: isActive ? colors.tint : colors.inputBorder,
          },
        ]}
      />
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerCircle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
