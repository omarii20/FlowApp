import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "@/i18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";

const LegalPolicies = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
      <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t('legalPoliciesTitle')} />

      <View style={{ paddingTop: 32 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.titleText, { color: colors.text }]}>{i18n.t('termsTitle')}</Text>
          <Text style={[styles.bodyText, { color: colors.text }]}>{i18n.t('termsContent')}</Text>

          <Text style={[styles.titleText, { color: colors.text, paddingTop: 32 }]}>{i18n.t('changesTitle')}</Text>
          <Text style={[styles.bodyText, { color: colors.text }]}>{i18n.t('changesContent')}</Text>

          <Text style={[styles.titleText, { color: colors.text, paddingTop: 32 }]}>{i18n.t('howWeCollectTitle')}</Text>
          <Text style={[styles.bodyText, { color: colors.text }]}>{i18n.t('howWeCollectContent')}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LegalPolicies;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  bodyText: {
    fontSize: 16,
    paddingTop: 8,
    lineHeight: 22,
  },
});
