import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationContextType = {
    notificationsEnabled: boolean;
    toggleNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        const loadSetting = async () => {
        const saved = await AsyncStorage.getItem("notificationsEnabled");
        if (saved !== null) setNotificationsEnabled(saved === "true");
        };
        loadSetting();
    }, []);

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await AsyncStorage.setItem("notificationsEnabled", newValue.toString());
        console.log("Notifications Enabled: " + newValue);
    }

    return (
        <NotificationContext.Provider value={{ notificationsEnabled, toggleNotifications }}>
        {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationSettings = () => {
const context = useContext(NotificationContext);
if (!context) throw new Error("useNotificationSettings must be used inside NotificationProvider");
return context;
};
