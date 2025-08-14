import React, { useState } from "react";
import { View, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import PhoneNumberInput from "@/components/ui/PhoneNumberInput";
import OtpVerification from "@/components/ui/OtpVerification";
import { useTheme } from "@/context/ThemeContext";

const SignIn = () => {
  const { setConfirmation, confirmation } = useAuth() as any;
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // iOS בלבד
      keyboardVerticalOffset={80}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {step === 1 ? (
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setStep={setStep}
            setConfirmation={setConfirmation}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <OtpVerification
            otp={otp}
            setOtp={setOtp}
            confirmation={confirmation}
            navigation={navigation}
            phoneNumber={phoneNumber}
            triggerErrorPopup={() => {}}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
