import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

type PropsType = {
  name?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  otherStyle?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  editable?: boolean;
  secureTextEntry?: boolean;
};

const FormField = ({
  name,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  otherStyle,
  editable = true,
  secureTextEntry,
}: PropsType) => {
  const [focus, setFocus] = useState(false);
  const { isRTL } = useI18n();
  const { colors } = useTheme();

  return (
    <View style={{ width: "100%", marginBottom: 0 }}>
      {name && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: colors.text,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {name}
        </Text>
      )}

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderWidth:focus ? 3 : 1,
          borderRadius: 12,
          width: "100%",
          marginTop: 8,
          borderColor: colors.inputBorder,
          backgroundColor: colors.inputBackground,
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={focus ? colors.inputBorder : colors.text}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType={keyboardType || "default"}
          secureTextEntry={
            secureTextEntry ||
            name?.toLowerCase().includes("password") // auto-detect
          }
          editable={editable}
          style={{
            color: colors.text,
            textAlign: isRTL ? "right" : "left",
          }}
        />
      </View>
    </View>
  );
};

export default FormField;
