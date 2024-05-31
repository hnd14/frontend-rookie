import React, { useContext, useEffect, useState } from "react";
import { verify } from "../login/services/LoginService.ts";
import { AuthContext } from "../context/AuthProvider.jsx";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    verify()
      .then((res) => {
        console.log(res);
        setAuth(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return <Outlet />;
};

export default PersistentLogin;
