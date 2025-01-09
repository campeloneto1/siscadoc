import { encrypt } from "@/utils/encryption";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  user: any;
  token: string;
  updateLocalUser: (user: any) => void;
  updateLocalToken: (token: string) => void;
  logout: () => void;
}

const UseAuth = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string>("");

  const updateLocalUser = (user: any) => {
    setUser(user);
    //await sessionStorage.setItem("user", encryptString(JSON.stringify(user)));
  };

  const updateLocalToken = (token: string) => {
    setToken(token);
    sessionStorage.setItem("token", encrypt(token));
  };

  const logout = () => {
    setUser({});
    //sessionStorage.removeItem("user");
    //sessionStorage.removeItem("token");
  };

  return (
    <UseAuth.Provider
      value={{ user, token, updateLocalUser, updateLocalToken, logout }}
    >
      {children}
    </UseAuth.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UseAuth);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
