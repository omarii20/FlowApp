// ✅ Home.tsx - אחראי על הצגת הנתונים והעברת props לקומפוננטות
import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "expo-router";
import Header from "@/components/homePage/Header";
import PropsDisplayDate from "@/components/homePage/PropsDisplayDate";
import Appointments from "@/components/homePage/ListData";
import { appointmentsResponse } from "@/hooks/Appointments_API";
import NotificationModal from "@/components/homePage/modal/NotificationModal";
import FilterModal from "@/components/homePage/modal/FilterModal";
import FavouriteModal from "@/components/homePage/modal/FavouriteModal";
import BackToTopButton from "@/components/homePage/BackToTopButton";
import { useTheme } from "@/context/ThemeContext";
import i18n from "@/i18n";

const Home = () => {
  const { user, loading: authLoading } = useAuth() as any;
  const navigation = useNavigation() as any;
  const { colors } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null) as any;

  const {
    activeDate,
    setActiveDate,
    appointments,
    filteredAppointments,
    loading: doctorLoading,
    showAppointments,
  } = appointmentsResponse(user?.phoneNumber || "");

  useEffect(() => {
    console.info("USER HomePage "+user?.phoneNumber)
    if (!user) {
      navigation.replace("(auth)/SignIn");
    }
  }, [user]);

  scrollY.addListener(({ value }) => {
    fadeAnim.setValue(value > 100 ? 1 : 0);
  });

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{i18n.t("checkAuthMessage")}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Header
          setShowNotification={setShowNotification}
          setShowFavouriteModal={setShowFavouriteModal}
        />

        <PropsDisplayDate
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          appointments={appointments}
        />

        <Appointments
          appointments={filteredAppointments}
          activeDate={activeDate}
          loading={doctorLoading}
          showAppointments={showAppointments}
        />
      </Animated.ScrollView>

      <BackToTopButton fadeAnim={fadeAnim} onPress={scrollToTop} />

      <NotificationModal showNotification={showNotification} />
      <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} />
      <FavouriteModal showFavouriteModal={showFavouriteModal} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
