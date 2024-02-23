import React from "react";
import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace/>
  }

  if (isAuthenticated && !(user.role === "admin"))
    return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRouteAdmin;
