import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Error404Page from "./Error404Page.tsx";
import Error403Page from "./Error403Page.tsx";
import { Link, Navigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { verify } from "../login/services/LoginService.ts";
import Error400Page from "./Error400Page.tsx";

const ErrorPage = ({ error }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true);
  console.log(error);
  if (error?.response?.status == 400) return <Error400Page />;
  if (error?.response?.status == 404) return <Error404Page />;
  if (error?.response?.status == 403) {
    verify()
      .then((res) => {
        setAuth(res);
        setisLoading(false);
      })
      .catch(() => {
        setAuth({ isAuthenticated: false });
        setisLoading(false);
      });
    if (isLoading) return <h1>Loading...</h1>;
    if (auth.isAuthenticated) {
      return <Error403Page />;
    }
    <Navigate to="/login" />;
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Stack className="d-flex justify-content-center align-items-center">
          <div>
            <h1 className="fw-b align-top align-content-center">Error</h1>
          </div>

          <div className="block align-middle">
            <h2 className="font-weight-normal lead" id="desc">
              Some thing went wrong....
            </h2>
          </div>
          <Link to="/" className="link-secondary">
            Go Home
          </Link>
        </Stack>
      </div>
    </>
  );
};

export default ErrorPage;
