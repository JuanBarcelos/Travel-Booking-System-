import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};