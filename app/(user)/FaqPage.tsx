import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbox from "@/components/ui/Searchbox";
import { faqData } from "@/constants/data";
import { Octicons } from "@expo/vector-icons";
import i18n from "@/i18n";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import { useTheme } from "@/context/ThemeContext";

const categoryList = ["General", "Login", "Account", "Doctor", "Lab"];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ padding: 24 }}>
          <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("faq")} />

          <View style={{ paddingTop: 32 }}>
            <Searchbox
              onSearch={(value: string) => {
                // אם תרצה אפשר לעדכן חיפוש אמיתי בעתיד
                console.log("Search:", value);
              }}
            />

            <View style={{ flexDirection: "row", paddingTop: 20 }}>
              <FlatList
                horizontal
                contentContainerStyle={{ gap: 12 }}
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                keyExtractor={(item, index) => "key" + index}
                renderItem={({ item, index }) => (
                  <Pressable onPress={() => setActiveCategory(index)}>
                    <Text
                      style={{
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: colors.tint,
                        borderRadius: 8,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        color: index === activeCategory ? colors.buttonText : colors.text,
                        backgroundColor: index === activeCategory ? colors.tint : "transparent",
                        fontWeight: "500",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            <View style={{ paddingTop: 32, gap: 16 }}>
              {faqData.map(({ id, question, answer }, idx) => (
                <Pressable
                  onPress={() => setActiveFaq(idx === activeFaq ? -1 : idx)}
                  style={{
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.inputBorder,
                    borderRadius: 12,
                    backgroundColor: colors.card,
                  }}
                  key={id}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.text,
                        paddingRight: 8,
                      }}
                    >
                      {question}
                    </Text>
                    <Octicons
                      name={activeFaq === idx ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  {activeFaq === idx && (
                    <Text
                      style={{
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderTopColor: colors.inputBorder,
                        borderStyle: "dashed",
                        marginTop: 12,
                        color: colors.text,
                        fontSize: 14,
                      }}
                    >
                      {answer}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqPage;

const styles = StyleSheet.create({});
