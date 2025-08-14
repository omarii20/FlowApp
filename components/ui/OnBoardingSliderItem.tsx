import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { getCurrentLang } from "@/i18n"; 
import { useTheme } from "@/context/ThemeContext";

export type LangContent = {
  title: string;
  colorTitle: string;
  description: string;
};

export type SlideItem = {
  id: number;
  he: LangContent;
  en: LangContent;
  ar: LangContent;
};

type Props = {
  item: SlideItem;
  idx: number;
};

const OnBoardingSliderItem = ({ item }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lang = getCurrentLang();
  const { colors } = useTheme();

  const textData = item[lang] ?? item["he"];

  if (!textData) {
    console.warn("⚠️ No text data found for item:", item);
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: SCREEN_WIDTH * 0.9,
          marginHorizontal: SCREEN_WIDTH * 0.05,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          {textData.title}{" "}
          <Text style={{ color: colors.tint }}>{textData.colorTitle}</Text>
        </Text>
        <Text
          style={[
            styles.description,
            { color: colors.text },
          ]}
        >
          {textData.description}
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingSliderItem;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 16,
    lineHeight: 15,
  },
});
