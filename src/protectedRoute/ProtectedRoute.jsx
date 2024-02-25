import React from "react";
import { useAuth } from "../../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
