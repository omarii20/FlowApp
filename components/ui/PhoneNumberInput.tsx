import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import auth from "@react-native-firebase/auth";
import arrowIcon from "@/assets/images/ArrowIcon.png";
import HeaderWithBackButtonOTP from "./HeaderWithBackButtonOTP";
import i18n from "@/i18n";
import { router } from "expo-router";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

type PhoneNumberInputProps = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  setStep: (step: number) => void;
  setConfirmation: (confirmation: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const PhoneNumberInput = ({
  phoneNumber,
  setPhoneNumber,
  setStep,
  setConfirmation,
  loading,
  setLoading
}: PhoneNumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isRTL } = useI18n();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { colors } = useTheme();

  const isPhoneValid = /^05\d{8}$/.test(phoneNumber);

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: isPhoneValid ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity: isPhoneValid ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isPhoneValid ? withTiming(-100) : withTiming(0) },
        { scaleX: -1 },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: isPhoneValid ? withTiming(1) : withTiming(0),
      transform: [{ translateX: isPhoneValid ? withTiming(0) : withTiming(100) }],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isPhoneValid ? 1 : 0,
        [0, 1],
        [colors.tint, colors.tint]
      ),
    };
  });

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://flowapi.comarkit.com/getUser/${phoneNumber}?api_key=your_secure_api_key_here`
      );
      const data = await response.json();

      if (!data.success) {
        setErrorMessage(i18n.t('clientNotFoundedMessage'));
        setLoading(false);
        return;
      }

      if (data.status === "banned") {
        setErrorMessage("⚠️ Client is banned.");
        setLoading(false);
        return;
      }

      if (data.status === "debt") {
        setErrorMessage("⚠️ You have debt.");
      }

      sendVerification();
    } catch (error) {
      setErrorMessage("⚠️ Error connecting to server");
      setLoading(false);
    }
  };

  const sendVerification = async () => {
    const formattedNumber = `+972${phoneNumber.slice(1)}`;

    try {
      setErrorMessage("");
      const confirmationResult = await auth().signInWithPhoneNumber(formattedNumber);
      setConfirmation(confirmationResult);
      setStep(2);
    } catch (error) {
      setErrorMessage("⚠️ Failed to send OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.LiniarContainer}>
        <LinearGradient colors={["#1e1e1e", "transparent"]} style={styles.background} />
        <View style={styles.headerContainer}>
          <HeaderWithBackButtonOTP isPushBack isTextWhite title={i18n.t('back')} />
        </View>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 300, height: 80, tintColor: colors.icon }}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) && text.length <= 10) setPhoneNumber(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={i18n.t('phoneNumber')}
            keyboardType="phone-pad"
            textAlign="center"
            maxLength={10}
            style={[
              styles.input,
              {
                borderBottomColor: isFocused || phoneNumber ? colors.tint : colors.inputBorder,
                color: colors.text,
              },
            ]}
            placeholderTextColor={colors.tabIconDefault}
          />
        </View>

        {errorMessage ? (
          <Text style={[styles.errorText, { textAlign: isRTL ? "right" : "left", color: colors.ButtonsCanceled }]}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableWithoutFeedback onPress={checkUserStatus}>
          <Animated.View style={[styles.button, buttonAnimationStyle, animatedColor]}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>
                  {i18n.t('sendCode')}
                </Animated.Text>
                <Animated.Image source={arrowIcon} style={[styles.arrow, arrowAnimationStyle]} />
              </>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.text }]}>
            {i18n.t('alreadyHaveAccText')}
            <Text
              style={{ color: colors.tint }}
              onPress={() => router.replace("/SignIn")}
            >
              {i18n.t('login')}
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  LiniarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputWrapper: {
    width: "100%",
    paddingTop: 10,
  },
  input: {
    borderBottomWidth: 2,
    padding: 10,
    fontSize: 26,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 14,
    paddingTop: 8,
  },
  button: {
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
  loginContainer: {
    paddingTop: 20,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
  },
});
