import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Searchbox from "../ui/Searchbox";

type Props = {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchSection = ({ setShowFilter }: Props) => {
  return (
    <View className="pt-8 px-6">
      <Text className="text-bodyText font-semibold pb-2">Friday, July 15</Text>
      <Text className="text-[24px] font-semibold">Let’s Find Your Doctor</Text>

      <View className="flex flex-row justify-between items-center pt-6 w-full">
        <Searchbox
          onSearch={(value: string) => {
            // תעדכן כאן אם תרצה חיפוש אמיתי
            console.log("Searching for:", value);
          }}
        />
        <TouchableOpacity
          className="p-3 rounded-lg bg-primaryColor"
          onPress={() => setShowFilter(true)}
        >
          <MaterialIcons name="tune" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({});
