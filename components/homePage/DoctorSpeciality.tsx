import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { doctorSpecialityData } from "@/constants/data";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import i18n from "@/i18n";

const DoctorSpeciality = () => {
  const { colors } = useTheme();

  return (
    <View style={{ paddingTop: 32 }}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {i18n.t("doctorSpeciality")}
        </Text>
        <Text
          onPress={() => router.push("/DoctorSpecialityPage")}
          style={[styles.viewAll, { color: colors.tint }]}
        >
          {i18n.t("viewAll")}
        </Text>
      </View>

      <View style={{ height: 90, paddingTop: 20 }}>
        <FlatList
          horizontal
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
          data={doctorSpecialityData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.card,
                { borderColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: colors.buttonBackground },
                ]}
              >
                <Ionicons name={item.icon as any} size={24} color={colors.icon} />
              </View>
              <View style={styles.infoContainer}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.cardSubtitle, { color: colors.text }]}>
                  {item.totalDoctors} {i18n.t("doctors")}
                  <AntDesign name="arrowright" />
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  iconWrapper: {
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  cardSubtitle: {
    paddingTop: 4,
    fontSize: 12,
  },
});
