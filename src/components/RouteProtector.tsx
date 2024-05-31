import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RouteProtector = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  console.log(auth);
  return (
    <>
      {auth.isAuthenticated ? (
        auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
          <Outlet />
        ) : (
          <h1>Unauthenticated</h1>
        )
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default RouteProtector;
