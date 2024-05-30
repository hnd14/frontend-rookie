import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RouteProtector = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {auth.isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default RouteProtector;
