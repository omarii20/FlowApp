import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const sortByOptions = ["7 Days", "1 Month", "6 Month", "All Time"];

const DropDown = () => {
  const { colors } = useTheme();

  return (
    <SelectDropdown
      data={sortByOptions}
      onSelect={(selectedItem, index) => {
        console.log("Selected:", selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={[
              styles.buttonContainer,
              {
                borderColor: colors.inputBorder,
                backgroundColor: colors.inputBackground,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              {selectedItem || "All Time"}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.itemContainer,
              {
                backgroundColor: isSelected ? colors.tint : "transparent",
              },
            ]}
          >
            <Text style={[styles.itemText, { color: "white" }]}>{item}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={[
        styles.dropdown,
        {
          backgroundColor: colors.tint,
        },
      ]}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dropdown: {
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 14,
  },
});
