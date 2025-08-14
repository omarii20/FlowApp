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

const HeaderWithBackButtonOTP = ({
  setModal,
  title,
  isPushBack = true,
  isTextWhite,
}: PropsTypes) => {
  const { colors } = useTheme();
  const { isRTL } = useI18n();

  const handleGoBack = () => {
    router.replace("/(auth)/OnBoardingSlider");
  };

  return (
    <View
      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      className="flex flex-row justify-start items-center mt-5 px-4"
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
          onPress={handleGoBack}
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
            color={isTextWhite ? colors.tint : "#fff"}
            size={20}
          />
        </Pressable>
      )}

      {title && (
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            fontWeight: "500",
            textAlign: isRTL ? "right" : "left",
            marginLeft: isRTL ? 0 : 10,
            marginRight: isRTL ? 10 : 0,
            color: isTextWhite ? "#fff" : colors.text,
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default HeaderWithBackButtonOTP;

const styles = StyleSheet.create({});
