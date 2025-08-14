import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import Searchbox from "@/components/ui/Searchbox";
import { topDoctorData } from "@/constants/data";
import AppointmentsCard from "@/components/ui/AppointmentsCard";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  showFavouriteModal: boolean;
};

const FavouriteModal = ({ showFavouriteModal }: Props) => {
  const { colors } = useTheme();

  const [filteredDoctors, setFilteredDoctors] = useState(topDoctorData);

  const handleSearch = (value: string) => {
    const filtered = topDoctorData.filter((doctor) =>
      doctor.name.toLowerCase().includes(value)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <Modal visible={showFavouriteModal} animationType="slide">
      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <HeaderWithBackButtonAfterLogin
          isPushBack={true}
          title={i18n.t("favotuiteModalTitle")}
        />

        <View style={styles.searchContainer}>
          <Searchbox onSearch={handleSearch} />
        </View>

        <View style={styles.listContainer}>
          {filteredDoctors.map((props, idx) => (
            <AppointmentsCard {...props} key={idx} />
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FavouriteModal;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  searchContainer: {
    paddingBottom: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 32,
  },
});
