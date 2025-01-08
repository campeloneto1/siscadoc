import { RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

export const ROUTES = {
  AUTH: "/auth",
  HOME: "/",
};

export default [
  {
    path: "/",
    errorElement: <></>,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <Login />,
  },
] as RouteObject[];
