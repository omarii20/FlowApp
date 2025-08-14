import { ActivityIndicator, View, StyleSheet } from "react-native";
import React from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();
  const navState = useRootNavigationState();

  // מחכים שה־Root Navigator יעלה ושבדיקת האימות תסתיים
  const isNavReady = !!navState?.key;
  if (!isNavReady || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  // אין ניווט אימפרטיבי—Redirect פותר את ה"תזמון"
  return <Redirect href={user ? "/(tabs)/Home" : "/(auth)/OnBoardingSlider"} />;
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
