import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import HeaderWithBackButtonOTP from "@/components/ui/HeaderWithBackButtonOTP";

// טיפוס ניווט
type RootStackParamList = {
  "(auth)/SignIn": undefined;
  "(tabs)": undefined;
};

const VerifyOTP: React.FC = () => {
  const { colors } = useTheme();
  const { confirmation } = useAuth() as any;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>() as any;

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (!confirmation) {
      console.log("🚨 No confirmation object found, redirecting...");
      navigation.replace("(auth)/SignIn");
    }

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    setOtp(newOtp);

    if (index === 5 && value) {
      confirmCode(newOtp.join(""));
    }
  };

  const confirmCode = async (enteredOtp: string) => {
    try {
      setLoading(true);
      console.log("🔢 Verifying OTP:", enteredOtp);

      await confirmation.confirm(enteredOtp);
      console.log("✅ User signed in successfully");
      Alert.alert("Success", "You are now signed in!");
      //router.replace("/(tabs)/Home");
    } catch (error) {
      console.log("❌ Error verifying OTP:", error);
      Alert.alert("Error", "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          backgroundColor: colors.background,
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 80,
        }}
      >
        <View style={styles.headerContainer}>
          <HeaderWithBackButtonOTP isPushBack isTextWhite title={i18n.t('back')} />
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <LottieView
            source={require("../../assets/animations/otp-verification.json")}
            loop={false}
            style={{ width: 100, height: 100 }}
          />
        </View>

        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: colors.text }}>
          {i18n.t("inserCode")}
        </Text>
        <Text style={{ fontSize: 14, textAlign: "center", color: colors.placeholder, marginTop: 6 }}>
          {i18n.t("codeMessage")}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                textAlign: "center",
                fontSize: 22,
                borderRadius: 8,
                padding: 10,
                width: 50,
                backgroundColor: colors.inputBackground,
                color: colors.text,
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <TouchableOpacity
            onPress={() => confirmCode(otp.join(""))}
            style={{
              backgroundColor: colors.buttonBackground,
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: colors.buttonText, fontWeight: "bold", fontSize: 16 }}>
                {i18n.t("login")}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 14, textAlign: "center", color: colors.placeholder }}>
            {i18n.t("reciveCode")}?
            <Text style={{ color: colors.text, fontWeight: "bold" }}> {i18n.t("resendCode")}</Text>
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "transparent",
  }
})