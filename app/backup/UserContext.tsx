import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  phoneNumber: string;
  name: string;
  profileImage: string;
  setPhoneNumber: (phone: string) => void;
  setName: (name: string) => void;
  setProfileImage: (image: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber, name, setName, profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
