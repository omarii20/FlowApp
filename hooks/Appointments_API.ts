import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthContext";

export interface Appointment {
  course_id: string,
  trainer_name: string;
  category_name: string;
  start_time: string;
  end_time: string;
  maxPeople: number;
  subscribed_status: boolean;
  date: string; 
}

export const appointmentsResponse = (phoneNumber: string) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeDate, setActiveDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);
  const { setUser } = useAuth();
  const [monthYear, setMonthYear] = useState(dayjs().format("MM-YYYY"));
  const _month = monthYear.split("-")[0];
  const _year = monthYear.split("-")[1];
  
  // שומר את מספר הטלפון בהקשר הגלובלי
  useEffect(() => {
    if (phoneNumber) {
      setUser((prevUser: any) => {
        if (!prevUser) return { phoneNumber };
        return {
          ...prevUser,
          phoneNumber,
        };
      });
    }
  }, [phoneNumber]);  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const _phoneNumber = phoneNumber.startsWith("+972") ? "0" + phoneNumber.slice(4) : phoneNumber;
        const apiUrl = `https://crm.comarkit.com/api/flow/app_home.php?month=${_month}&year=${_year}&phone=${_phoneNumber}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const text = await response.text();
  
        if (!response.ok) {
          console.error("❌ Error from server");
          return;
        }
  
        const data = JSON.parse(text);
  
        if (Array.isArray(data.appointments) && data.appointments.length > 0) {
          setAppointments(data.appointments);
        } else {
          console.warn("⚠️ No appointments found");
          setAppointments([]);
        }
        
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setShowAppointments(true), 1000);
      }
    };
  
    if (phoneNumber && monthYear) {
      fetchAppointments();
    }
  }, [phoneNumber, monthYear]);  

  // עדכן monthYear אם תאריך משתנה לחודש אחר
  useEffect(() => {
    const newMonthYear = dayjs(activeDate).format("MM-YYYY");
    if (newMonthYear !== monthYear) {
      setMonthYear(newMonthYear);
    }
  }, [activeDate]);

  const filteredAppointments = appointments.filter(
    (appt) => dayjs(appt.date).format("YYYY-MM-DD") === activeDate
  );

  return {
    appointments,
    filteredAppointments,
    activeDate,
    setActiveDate,
    loading,
    showAppointments,
  };
};
