import { useEffect } from "react";
import { useAuth } from "../hooks/UseAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./router";
import { AuthAPI } from "@/api";
import { decrypt } from "@/utils/encryption";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { user, updateLocalUser, token, updateLocalToken } = useAuth();
  const localtoken = sessionStorage.getItem("token");
  const userToken = user.token;

  const setUser = async () => {
    const user = await AuthAPI.user();
    updateLocalUser(user);
  };

  useEffect(() => {
    if (localtoken && !token) {
      updateLocalToken(decrypt(localtoken));
    }
    if (!user.nome) {
      setUser();
    }
  }, [token, localtoken]);

  if (!userToken && !localtoken) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
