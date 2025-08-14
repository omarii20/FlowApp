import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
  colors: typeof Colors.light;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme === "dark" ? "dark" : "light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      console.log("🌙 Loaded theme from storage:", savedTheme);

      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        // ברירת מחדל לפי מערכת
        setTheme(colorScheme === "dark" ? "dark" : "light");
      }
    };

    loadTheme();
  }, []);

    const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
    console.log("🔄 Saved theme:", newTheme);
  };

  const colors = Colors[theme];
  const isDark = theme === "dark";
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
