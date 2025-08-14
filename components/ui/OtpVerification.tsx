import React, { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import HeaderWithBackButtonOTP from "./HeaderWithBackButtonOTP";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RootStackParamList = { "(auth)/SignIn": undefined; "(tabs)": undefined; };
type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type Props = {
  otp: string[]; setOtp: (otp: string[]) => void; confirmation: any; navigation: any; phoneNumber: string;
  triggerErrorPopup?: (message: string) => void;
};

const OtpVerification: React.FC<Props> = ({ otp, setOtp, confirmation, phoneNumber, triggerErrorPopup }) => {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const { isRTL, i18n } = useI18n();
  const { colors } = useTheme();

  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (timer > 0) { const id = setInterval(() => setTimer((p) => p - 1), 1000); return () => clearInterval(id); }
    setResendDisabled(false);
  }, [timer]);

  useEffect(() => { if (otp.join("").length === 6) confirmCode(otp.join("")); }, [otp]);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://flowapi.comarkit.com/getUser/${phoneNumber}?api_key=your_secure_api_key_here`);
      const data = await res.json();
      if (!data.success || data.status === "banned") { setStatusMessage("⚠️ המשתמש לא פעיל או חסום"); setLoading(false); return; }
      if (data.status === "debt") setStatusMessage("⚠️ יש חוב פתוח");
      confirmCode(otp.join(""));
    } catch (e) {
      setStatusMessage("⚠️ שגיאה בשרת");
      setLoading(false);
    }
  };

  const confirmCode = async (enteredOtp: string) => {
    if (!enteredOtp || enteredOtp.length < 6) { setHasError(true); return; }
    if (!confirmation) { triggerErrorPopup?.("❌ אין אישור קוד, נסה שוב."); return; }
    try { setLoading(true); await confirmation.confirm(enteredOtp); } 
    catch (e) { setHasError(true); }
    finally { setLoading(false); }
  };

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    if (value === "" && index > 0) { next[index] = ""; inputRefs.current[index - 1]?.focus(); }
    else { next[index] = value; if (value && index < 5) setTimeout(() => inputRefs.current[index + 1]?.focus(), 100); }
    setOtp(next);
  };

  const requestNewCode = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    try { await auth().signInWithPhoneNumber(`+972${phoneNumber.slice(1)}`); setResendDisabled(true); setTimer(120); }
    catch (e) {}
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: colors.background }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={140}
    >
      <View style={[styles.linearContainer, { backgroundColor: colors.background }]}>
        <LinearGradient colors={["#1e1e1e", "transparent"]} style={styles.background} />
        <View style={styles.headerContainer}>
          <HeaderWithBackButtonOTP isPushBack isTextWhite title={i18n.t("back")} />
        </View>
        <LottieView ref={animationRef} source={require("../../assets/animations/otp-verification.json")} autoPlay loop style={styles.illustration} />
      </View>

      <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>{i18n.t("verificationCode")}</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          {i18n.t("enterCodeSent")} <Text style={{ color: colors.tint }}>{phoneNumber ? `${phoneNumber.slice(-4)}****05` : ""}</Text>
        </Text>

        {!!statusMessage && <Text style={[styles.statusMessage, { color: colors.ButtonsCanceled }]}>{statusMessage}</Text>}

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(r) => (inputRefs.current[index] = r)}
              style={[styles.otpInput, { borderBottomColor: hasError ? colors.ButtonsCanceled : colors.tint, color: colors.text }]}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              value={digit}
              onChangeText={(v) => handleOtpChange(v, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) inputRefs.current[index - 1]?.focus();
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={checkUserStatus}
          disabled={loading || otp.join("").length < 6}
          style={[styles.verifyButton, { backgroundColor: otp.join("").length === 6 ? colors.tint : colors.inputBorder }]}
        >
          {loading ? <ActivityIndicator color="white" size="small" /> : <Text style={styles.verifyText}>{i18n.t("verifyText")}</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={requestNewCode} disabled={isResendDisabled}>
          <Text style={[styles.resendText, { color: colors.tint }]}>
            {isResendDisabled ? `${i18n.t("sendAgainWhile")} ${timer} ${i18n.t("second")}` : i18n.t("resendCode")}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Image source={{ uri: "https://comarkit.com/delivery/footerlight.png" }} style={styles.logo} />
          <Text style={[styles.footerText, { color: colors.text }]}>COMARK</Text>
        </View>
      </View>
      </KeyboardAwareScrollView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  headerContainer: { position: "absolute", top: 0, left: 20, right: 20, zIndex: 10, backgroundColor: "transparent" },
  linearContainer: { alignItems: "center", justifyContent: "center" },
  background: { position: "absolute", left: 0, right: 0, top: 0, height: 300 },
  illustration: { width: 900, height: 250 },
  formContainer: { width: "100%", paddingTop: 20, paddingBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginTop: 5, textAlign: "center" },
  statusMessage: { fontSize: 14, marginTop: 10, textAlign: "center" },
  otpContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20, direction: "ltr" },
  otpInput: { width: "12.6%", height: 50, borderBottomWidth: 2, textAlign: "center", fontSize: 22, fontWeight: "bold", marginHorizontal: 5 },
  verifyButton: { width: "90%", marginTop: 30, paddingVertical: 15, borderRadius: 30, alignItems: "center" },
  verifyText: { color: "white", fontSize: 18, fontWeight: "bold" },
  resendText: { marginTop: 20, fontSize: 14 },
  footerContainer: { marginTop: 10, alignItems: "center", paddingBottom: 10 },
  logo: { width: 50, height: 20, resizeMode: "contain" },
  footerText: { fontSize: 10, marginTop: 5 },
});
