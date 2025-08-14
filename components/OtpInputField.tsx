import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

type Nullable<T> = T | null;

const OtpInputField = ({ disabled }: { disabled: boolean }) => {
  const inputRefs = useRef<Array<Nullable<TextInput>>>([]);
  const { colors } = useTheme();

  const handleChange = (text: string, idx: number) => {
    if (text.length !== 0) {
      return inputRefs.current[idx + 1]?.focus();
    }
    return inputRefs.current[idx - 1]?.focus();
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    if (event.nativeEvent.key === "Backspace") {
      handleChange("", idx);
    }
  };

  return (
    <View style={styles.container}>
      {[...new Array(4)].map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.inputWrapper,
            {
              borderColor: colors.tint,
              backgroundColor: colors.inputBackground,
            },
          ]}
        >
          <TextInput
            ref={(ref) => {
              inputRefs.current[idx] = ref;
            }}
            style={[
              styles.input,
              { color: colors.text },
            ]}
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            keyboardType="decimal-pad"
            testID={`OTPInput-${idx}`}
            onChangeText={(text) => handleChange(text, idx)}
            onKeyPress={(event) => handleBackspace(event, idx)}
          />
        </View>
      ))}
    </View>
  );
};

export default OtpInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  inputWrapper: {
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    width: 24,
  },
});
