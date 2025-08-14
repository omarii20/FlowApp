import React, { useState } from "react";
import { Image, Text, View,StyleSheet, Alert } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BookButton from "../BookButton";
import i18n from "@/i18n";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";
import profileImg from "@/assets/images/user_img.png"
import {cancelAppointment} from "@/hooks/cancelAppointment_API"; 
import { useAuth } from "@/context/AuthContext";

const AppointmentsCard = ({
  course_id,
  name,
  medicalName,
  availableTime,
  date,
  maxPeople,
  subscribedPeoples,
  image,
  subscribedStatus
}: {
  course_id: string;
  name: string;
  medicalName: string;
  date: string;
  availableTime: string;
  maxPeople: number;
  subscribedPeoples: number;
  image: string;
  subscribedStatus?:boolean
}) => {
  const { isRTL } = useI18n();
  const { colors } = useTheme();
  const router = useRouter();
  const { user, formatPhoneNumber } = useAuth();
  const [cancelModal, setCancelModal] = useState(false);
  const _phoneNumber = formatPhoneNumber(user?.phoneNumber);

  return (
    <View
      style={{
        flexDirection: isRTL ? "row-reverse" : "row",
        backgroundColor: colors.card,
        padding: 12,
        borderRadius: 12,
        marginTop: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={ image && image.startsWith("http") ? { uri: image } : profileImg}
        style={{          
          width: 70,
          height: 70,
          borderRadius: 8,
          marginEnd: isRTL ? 0 : 8,
          marginStart: isRTL ? 8 : 0,}}
        resizeMode="cover"
      />

      {/* מידע */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 8,
          alignItems: isRTL ? "flex-end" : "flex-start",
        }}
      >
        <Text
          onPress={() => router.push("/DoctorProfile")}
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {name}
        </Text>

        <Text style={{ color: colors.text, fontSize: 12, paddingVertical: 4 }}>
          {medicalName}
          <Entypo name="dot-single" color={colors.icon} />
        </Text>

        <View style={{ flexDirection: isRTL ? "row-reverse" : "row", alignItems: "center" }}>
          <Text style={{ color: colors.tint, fontSize: 12 }}>{availableTime}</Text>
          <AntDesign name="clockcircle" size={12} color={colors.tint} style={{ marginHorizontal: 4 }} />
        </View>

        <Text style={{ color: colors.text, fontSize: 12 }}>
          {i18n.t("participants")}: {subscribedPeoples} / {maxPeople}
        </Text>

        {/* פס התקדמות */}
        {typeof maxPeople === "number" && (
          <View
            style={{
              marginTop: 4,
              height: 6,
              width: 100,
              backgroundColor: "#E0E0E0",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${(subscribedPeoples / maxPeople) * 100}%`,
                backgroundColor: "#34C759",
              }}
            />
          </View>
        )}
      </View>

      {subscribedStatus ? (
      <BookButton
        text={i18n.t("cancel")}
        onPress={async () => {
          const { success, error: cancelError, message } = await cancelAppointment(course_id, _phoneNumber);
          if (success) {
            setCancelModal(true);
            router.push("/CancelAppoinmentSuccessfully");
          } else {
            alert(i18n.t('cancelErrorAppinment') || message || i18n.t('cancelledFaildMsg'));
          }
        }}
      />
    ) : (
      <BookButton
        text={i18n.t("register")}
        link={{
          pathname: "/BookingConfirm",
          params: {
            course_id,
            name,
            medicalName,
            availableTime,
            date,
            image,
          },
        }}
      />
    )}

    </View>
  );
};

export default AppointmentsCard;

const styles = StyleSheet.create({
  button: {
    borderTopWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});