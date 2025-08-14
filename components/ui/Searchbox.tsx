import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  onSearch: (value: string) => void;
};

const Searchbox = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const { colors } = useTheme();

  const handleChange = (value: string) => {
    setSearchValue(value);
    onSearch(value.toLowerCase());
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.inputBorder,
          backgroundColor: colors.inputBackground,
        },
      ]}
    >
      <Ionicons
        color={colors.text}
        name="search"
        size={20}
        style={{ marginRight: 8 }}
      />

      <TextInput
        placeholderTextColor={colors.text}
        placeholder={i18n.t("search_placeholder")}
        style={[styles.input, { color: colors.text }]}
        value={searchValue}
        onChangeText={handleChange}
      />
      {searchValue && (
        <Pressable
          onPress={() => {
            handleChange("");
          }}
          style={[
            styles.clearButton,
            { backgroundColor: colors.tint },
          ]}
        >
          <AntDesign name="close" color="white" size={14} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
  },
  input: {
    flex: 1,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
