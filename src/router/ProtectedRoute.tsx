import { useEffect } from "react";
import { useAuth } from "../hooks/UseAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./router";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { user, updateLocalUser } = useAuth();
  const localtoken = sessionStorage.getItem("token");
  const userToken = user.token;

  useEffect(() => {
    if (localtoken && !user.token) {
      updateLocalUser({
        ...user,
      });
    }
  }, [user, updateLocalUser]);

  if (!userToken && !localtoken) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
