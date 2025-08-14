import { Pressable, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButton from "@/components/ui/RadioButton";
import { useRouter } from "expo-router";
import { changeLocale, loadLocale } from "@/i18n";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";

const LanguageList = [
  { label: "English", code: "en" },
  { label: "עברית", code: "he" },
  { label: "عربي", code: "ar" },
];

const LanguageSettings = () => {
  const router = useRouter();
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const load = async () => {
      await loadLocale();
      setSelectedLanguage(i18n.locale.split("-")[0]); 
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      await changeLocale(selectedLanguage as "en" | "he" | "ar");
      Alert.alert("✅", i18n.t('langUpdateSuccess'));
      router.replace("/ProfileTab");
    } catch (error) {
      console.error("Failed to change language:", error);
      Alert.alert(i18n.t('langUpdateFaild'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 24 }}>
          <HeaderWithBackButtonAfterLogin  isPushBack={true} title={i18n.t('language')} />

          <View 
            style={{
              marginTop: 32,
              padding: 24,
              borderWidth: 1,
              borderColor: colors.inputBorder,
              borderRadius: 12,
              backgroundColor: colors.card,
            }}
          >
            <Text 
              style={{
                textAlign: isRTL ? "right" : "left",
                color: colors.tint,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {i18n.t("language")}
            </Text>

            <View style={{ paddingTop: 8, }}>
              {LanguageList.map((item, idx) => (
                <Pressable
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 16,
                    borderBottomWidth: LanguageList.length === idx + 1 ? 0 : 1,
                    borderBottomColor: colors.inputBorder,
                    paddingBottom: LanguageList.length === idx + 1 ? 0 : 16,
                  }}
                  onPress={() => setSelectedLanguage(item.code)}
                  key={idx}
                >
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>{item.label}</Text>
                  <RadioButton isActive={selectedLanguage === item.code} />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ width: "100%", paddingTop: 32 }}>
            <Pressable
              onPress={handleSave}
              style={{
                backgroundColor: colors.buttonBackground,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: colors.buttonText, textAlign: "center", fontWeight: "600", fontSize: 16 }}>
                {i18n.t("save")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageSettings;

const styles = StyleSheet.create({});
