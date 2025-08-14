import dayjs from "dayjs";
import { useEffect, useState } from "react";

export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled" | "All";

export type Appointment = {
  course_id: string;
  name: string;
  image: string;
  sessionStatus: AppointmentStatus;
  availableTime: string;
  date: string;
  sessionTyps: string;
  rating: string;
};

const mapStatusToApi = (status: AppointmentStatus): string => {
  switch (status) {
    case "Upcoming":
      return "reserved";
    case "Completed":
      return "completed";
    case "Cancelled":
      return "cancelled";
    case "All":
    default:
      return "all";
  }
};

export const useAppointments = (
    phoneNumber: string,
    status: AppointmentStatus,
    month: number,
    year: number
) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
            setLoading(true);
            const apiStatus = mapStatusToApi(status);
            const res = await fetch(
                `https://crm.comarkit.com/api/flow/endpoints.php?action=booking&status=${apiStatus}&month=${month}&year=${year}&phone=${phoneNumber}`
            );
            const json = await res.json();

            if (!json.success) {
                setAppointments([]);
                setError("No bookings found");
                return;
            }

            const mapped: Appointment[] = json.appointments.map((item: any) => {
                return {
                    name: item.name,
                    image: item.image,
                    availableTime: item.availableTime,
                    date: item.date,
                    course_id: item.course_id,
                    sessionStatus: item.sessionStatus || "Upcoming",
                    // sessionTyps: item.sessionTyps || "Audio Call",
                    // rating: item.rating || "4.7",
                };
            });

            setAppointments(mapped);
            setError(null);
            } catch (err) {
                setError("An error occurred while loading the data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [phoneNumber, status, month, year]);

    return { appointments, loading, error };
};
