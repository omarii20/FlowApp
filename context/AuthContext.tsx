import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router"; // ✅ הוספנו לניווט

// ✅ מגדירים את הטיפוס
export type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  confirmation: any;
  setConfirmation: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  logout: () => Promise<void>;
  formatPhoneNumber: (raw: string) => string;
};

// ✅ יוצרים את ה-Context עם טיפוס מדויק
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const formatPhoneNumber = (raw: string) => {
    return raw?.startsWith("+972") ? "0" + raw.slice(4) : raw;
  };

  useEffect(() => {
  
    const loadUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to load user session:", error);
      }
      setLoading(false);
    };
  
    const unsubscribe = auth().onAuthStateChanged(async (authenticatedUser) => {
      if (authenticatedUser && authenticatedUser.phoneNumber) {
        console.info("✅ USER CONNECTED:", authenticatedUser?.phoneNumber);
        setUser(authenticatedUser);
        await AsyncStorage.setItem("user", JSON.stringify(authenticatedUser));
        router.replace("/(tabs)/Home");
      } else {
        console.warn("⚠️ No valid user in onAuthStateChanged");
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
    });
    
    loadUserSession();
    return () => unsubscribe();
  }, []);  

  const logout = async () => {
    try {
      if (auth().currentUser) {
        await auth().signOut();
      }
      setConfirmation(null);
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        confirmation,
        setConfirmation,
        loading,
        logout,
        formatPhoneNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ הוק משתמש מותאם עם בדיקה
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
