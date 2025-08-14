import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppointmentsCard from "../ui/AppointmentsCard";
import Animated from "react-native-reanimated";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import { Appointment } from "@/hooks/Appointments_API";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

const Appointments = ({
  appointments,
  activeDate,
  loading,
  showAppointments,
}: {
  appointments: Appointment[];
  activeDate: string;
  loading: boolean;
  showAppointments: boolean;
}) => {
    const { colors } = useTheme();
    const filteredAppointments = appointments.filter(
      ({ date }) => dayjs(date).format("YYYY-MM-DD") === activeDate
    );
    
  return (
    <Animated.View className="mt-2 px-3">
      {loading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <View key={idx} style={[styles.cardContainer, { backgroundColor: colors.card }]}>
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.imagePlaceholder} />
            <View style={styles.textContainer}>
              <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.textPlaceholder} />
              <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.textPlaceholder, { width: "50%" }]} />
              <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.textPlaceholder, { width: "40%" }]} />
            </View>
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.buttonPlaceholder} />
          </View>
        ))
      ) : filteredAppointments.length > 0 && showAppointments ? (
        filteredAppointments.map((appointment: any, idx: number) => (
            <AppointmentsCard
              key={idx}
              course_id={appointment.course_id}
              name={appointment.trainer_name}
              medicalName={appointment.category_name}
              availableTime={`${appointment.start_time} - ${appointment.end_time}`}
              date={appointment.date}
              maxPeople={appointment.maxPeople}
              subscribedPeoples={appointment.subscribedPeoples}
              image={appointment.image}
              subscribedStatus={appointment.subscribed_status}
            />
          ))
      ) : (
        <Text style={[styles.noLesson, { color: colors.text }]} className="text-center text-bodyText pt-4">{i18n.t('no_lessons_today')}</Text>
      )}
    </Animated.View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    minHeight: 90,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  textPlaceholder: {
    height: 12,
    borderRadius: 5,
    marginBottom: 6,
    width: "80%",
  },
  noLesson:{
    marginTop:'50%',
    fontSize:20,
    opacity:0.5
  },
  buttonPlaceholder: {
    width: 80,
    height: 30,
    borderRadius: 5,
  },
});
