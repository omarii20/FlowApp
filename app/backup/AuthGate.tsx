// app/AuthGate.tsx

import { useAuth } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function AuthGate() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user && user.phoneNumber) {
      router.replace("/Home");
    } else {
      router.replace("/SignIn");
    }
  }, [user, loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
