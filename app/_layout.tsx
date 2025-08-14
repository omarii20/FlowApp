// app/_layout.tsx

import { useEffect, useState } from "react";
import { View, I18nManager } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { useI18n } from "@/hooks/use18n";
import { registerForPushNotificationsAsync, setupPushNotificationListeners, getFCMToken } from "../config/firebaseConfig";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const { isRTL } = useI18n();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  }, [isRTL]);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();

    const init = async () => {
      const expoToken = await registerForPushNotificationsAsync();
      setExpoPushToken(expoToken || "Failed to get token");
      const fcmToken = await getFCMToken();
      console.log("🔑 Expo:", expoToken, "🔑 FCM:", fcmToken);
    };

    init();
    setupPushNotificationListeners();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  // ❌ אין כאן useTheme!
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// ✅ כאן מותר להשתמש ב-useTheme כי אנחנו כבר בתוך ThemeProvider
function AppShell() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={colors.background}
        translucent={false}
        hidden={false}
      />

      {/* החלק העליון של ה-SafeArea */}
      <SafeAreaView edges={['top']} style={{ flex: 0, backgroundColor: colors.background }} />

      {/* החלק המרכזי של האפליקציה */}
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={{ flex: 1, backgroundColor: colors.background }} 
      >
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: colors.background }, 
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
            }}
          >
            <Stack.Screen name="(auth)/SignIn" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/SignUp" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/OnBoardingSlider" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/VerifySuccessfully" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/ForgetPassword" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/VerifyOTP" options={{ headerShown: false }} />

            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)/Home" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </SafeAreaView>

      <Toast />
    </>
  );
}

const styles = {
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
};
