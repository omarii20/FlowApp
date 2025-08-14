import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import RadioButton from "@/components/ui/RadioButton";
import LinkButton from "@/components/LinkButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const CancelAppoinment = () => {
  const [reason, setReason] = useState(0);
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24 }}>
        <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("cancelAppointment")} />

        <View className="pt-8">
          <Text
            className="text-xl font-semibold"
            style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
          >
            {i18n.t("reasonTitle")}
          </Text>

          <View>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Pressable
                onPress={() => setReason(idx)}
                key={idx}
                style={{ flexDirection: isRTL ? "row-reverse" : "row", borderColor: colors.border }}
                className="justify-start items-center w-full px-4 py-3 border rounded-lg mt-4"
              >
                <RadioButton isActive={reason === idx} />
                <Text
                  className="text-base pl-2 pr-2"
                  style={{ color: colors.text }}
                >
                  {i18n.t(`cancelReasons${idx + 1}`)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="pt-6">
          <Text
            className="text-base font-semibold pb-3"
            style={{ textAlign: isRTL ? "right" : "left", color: colors.text }}
          >
            {i18n.t("whatProblem")}
          </Text>
          <View
            style={{
              borderColor: colors.border,
            }}
            className="px-4 py-3 border rounded-xl w-full"
          >
            <TextInput
              multiline={true}
              placeholder={i18n.t('whatProblem')}
              placeholderTextColor={colors.placeholder}
              numberOfLines={5}
              style={{
                textAlignVertical: "top",
                textAlign: isRTL ? "right" : "left",
                color: colors.text,
              }}
            />
          </View>
        </View>

        <View className="w-full pt-6">
          <LinkButton link="/CancelAppoinmentSuccessfully" text={i18n.t('ok')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelAppoinment;

const styles = StyleSheet.create({});
