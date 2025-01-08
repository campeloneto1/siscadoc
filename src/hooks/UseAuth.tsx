import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

interface UserContextType {
  user: any;
  updateLocalUser: (user: any) => void;
  logout: () => void;
}

const UseAuth = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({});

  const updateLocalUser = async (user: any) => {
    await setUser(user);
    //await sessionStorage.setItem("user", encryptString(JSON.stringify(user)));
  };

  const logout = () => {
    setUser({});
    //sessionStorage.removeItem("user");
    //sessionStorage.removeItem("token");
  };

  return (
    <UseAuth.Provider value={{ user, updateLocalUser, logout }}>
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
