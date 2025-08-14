import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import FormField from "@/components/FormField";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import { updateProfile } from "@/hooks/EditProfile_API";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/hooks/use18n";
import ImagePickerBox from "@/components/ui/ImagePickerBox";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = () => {
  const { colors } = useTheme();
  const { user, formatPhoneNumber } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState<string | null>(null);
  const { isRTL } = useI18n();
  const [phoneError, setPhoneError] = useState<boolean | null>(null);
  const [phone, setPhone] = useState(formatPhoneNumber(user?.phoneNumber) || "");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("✅ Image URI:", result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!phone.trim()) {
      alert(i18n.t("phoneRequired"));
      return;
    }
  
    const { success, error, message } = await updateProfile({
      phoneNumber: phone,
      firstName,
      lastName,
      birthDate,
      gender,
      image,
    });
  
    if (success) {
      router.push("/ProfileTab");
    } else {
      alert(i18n.t('error')|| i18n.t("somethingWentWrong"));
    }
  };
  

  return (
      <KeyboardAwareScrollView
        style={{backgroundColor: colors.background }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
      <View style={{ padding: 24 }}>
        <HeaderWithBackButtonAfterLogin isPushBack={true} title={i18n.t("editProfile")} />
        <View  style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={handlePickImage} style={{ alignSelf: "center", marginVertical: 20 }}>
            {image ? (
              <Image source={{ uri: image }} onError={(e) => console.log("🛑 Image failed to load:", e.nativeEvent.error)} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <ImagePickerBox />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <FormField
            placeholder={i18n.t("phoneNumber")}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setPhoneError(!text.trim());
            }}
            editable={true}
          />
          {phoneError && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {i18n.t("phoneRequired")}
            </Text>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <FormField placeholder={i18n.t("fName")} value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={{ marginTop: 10 }}>
          <FormField placeholder={i18n.t("lName")} value={lastName} onChangeText={setLastName} />
        </View>
        <View style={{ marginTop: 10 }}>
          <FormField placeholder="00/00/2000" value={birthDate} onChangeText={setBirthDate} />
        </View>
        <View style={{ marginTop: 20 ,marginBottom:20}}>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 10,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {i18n.t("genderText")}:
          </Text>
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 20,
            }}
          >
            {[
              { label: i18n.t("male"), value: "male" },
              { label: i18n.t("female"), value: "female" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setGender(option.value)}
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colors.text,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {gender === option.value && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: colors.text,
                      }}
                    />
                  )}
                </View>
                <Text style={{ color: colors.text, fontSize: 14 }}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity       
          style={{
            width: "100%",
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: colors.buttonBackground,
          }}
          onPress={handleSave}>
          <Text         
            style={{
            color: colors.buttonText,
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            }}>
            {i18n.t("save")}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;
