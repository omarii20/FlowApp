import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import Dot from "./Dot";
import { useTheme } from "@/context/ThemeContext";

type DataProps = Array<{
  id: number;
}>;

type Props = {
  onbordingSliderData: DataProps;
  x: SharedValue<number>;
};

const Pagination = ({ onbordingSliderData, x }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      {onbordingSliderData.map((_, index) => (
        <Dot key={index} index={index} x={x} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
});
