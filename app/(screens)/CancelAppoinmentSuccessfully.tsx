import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import CircleBg from "@/components/CircleBg";
import LinkButton from "@/components/LinkButton";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

const SIZE = 100;

const CancelAppoinmentSuccessfully = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-6 my-8 items-center">
          <View
            style={[styles.dot, { backgroundColor: colors.tint }]}
            className="items-center justify-center"
          >
            <Feather
              name="check"
              size={48}
              color="white"
              style={{ zIndex: 100 }}
            />

            {[...Array(3).keys()].map((_, idx) => (
              <CircleBg key={idx} index={idx} />
            ))}
          </View>

          <View className="py-20">
            <Text
              className="text-2xl font-bold text-center"
              style={{ color: colors.text }}
            >
              {i18n.t("cancelSuccessfullyText")}
            </Text>
            <Text
              className="text-[14px] text-center pt-3 px-6"
              style={{ color: colors.text }}
            >
              {i18n.t("cancelMessage")}
            </Text>
          </View>

          <LinkButton link="/Home" text={i18n.t("ok")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelAppoinmentSuccessfully;

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});
