import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Error403Page from "./Error403Page.tsx";

const RouteProtector = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {auth.isAuthenticated ? (
        auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
          <Outlet />
        ) : (
          <Error403Page />
        )
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default RouteProtector;
