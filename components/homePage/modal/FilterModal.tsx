import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import CustomSwitch from "@/components/CustomSwitch";
import { scheduleDates } from "@/constants/data";
import { AntDesign } from "@expo/vector-icons";
import CalendarModal from "@/components/ui/CalendarModal";
import { useTheme } from "@/context/ThemeContext";

type PropsType = {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const sortOption = [
  "Popularity",
  "Star Rating (highest first)",
  "Best Reviewed First",
  "Most Reviewed First",
  "Price (lowest first)",
  "Price (highest first)",
];

const workExperience = ["< 1", "1 - 5", "5 - 10", "10 - 15", "15 - 20", "20+"];

const FilterModal = ({ showFilter, setShowFilter }: PropsType) => {
  const { colors } = useTheme();
  const [sortBy, setSortBy] = useState(0);
  const [activeGender, setActiveGender] = useState("Male");
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Modal visible={showFilter} animationType="slide">
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
        <HeaderWithBackButtonAfterLogin isPushBack={true} setModal={setShowFilter} title="Filter" />

        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Today</Text>
          <CustomSwitch value={false} onChange={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Sort Option</Text>
          <View style={[styles.optionBox, { borderColor: colors.border }]}>
            {sortOption.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSortBy(idx)}
                style={[
                  styles.optionItem,
                  {
                    borderBottomWidth: idx !== sortOption.length - 1 ? 1 : 0,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>{item}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: sortBy === idx ? colors.tint : colors.border },
                  ]}
                >
                  {sortBy === idx && <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Gender</Text>
          <View style={styles.row}>
            {["Male", "Female"].map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveGender(item)}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor: activeGender === item ? colors.buttonBackground : "transparent",
                    borderColor: colors.buttonBackground,
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeGender === item ? colors.buttonText : colors.buttonBackground,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Work Experience (years)</Text>
          <View style={styles.wrapRow}>
            {workExperience.map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveExperience(idx)}
                style={[
                  styles.expButton,
                  {
                    backgroundColor: activeExperience === idx ? colors.buttonBackground : "transparent",
                    borderColor: colors.buttonBackground,
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeExperience === idx ? colors.buttonText : colors.buttonBackground,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Schedules</Text>
            <CalendarModal />
          </View>
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 16 }}
            showsHorizontalScrollIndicator={false}
            data={scheduleDates}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <Pressable style={[styles.slot, { borderColor: colors.buttonBackground }]}>
                <Text style={[styles.slotText, { color: colors.text }]}>{item.date}</Text>
                <Text style={[styles.slotSubText, { color: colors.text }]}>{item.day}</Text>
              </Pressable>
            )}
          />
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 16, marginTop: 16 }}
            showsHorizontalScrollIndicator={false}
            data={["10.00Am", "11.00Am", "12.00Pm", "01.00Pm"]}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <Pressable style={[styles.slot, { borderColor: colors.buttonBackground }]}>
                <Text style={[styles.slotText, { color: colors.text }]}>{item}</Text>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Rating</Text>
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 16 }}
            showsHorizontalScrollIndicator={false}
            data={["2.5", "3.0", "3.5", "4.0", "4.5", "5.0"]}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <Pressable style={[styles.slot, { borderColor: colors.buttonBackground }]}>
                <Text style={{ color: colors.buttonBackground, fontWeight: "500" }}>
                  {item}
                  <AntDesign name="staro" size={16} color={colors.buttonBackground} />
                </Text>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionBox: {
    borderWidth: 1,
    borderRadius: 12,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  expButton: {
    width: "47%",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  slot: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  slotText: {
    fontSize: 16,
    fontWeight: "500",
  },
  slotSubText: {
    fontSize: 12,
  },
});
