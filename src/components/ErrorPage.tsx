import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Error404Page from "./Error404Page.tsx";
import Error403Page from "./Error403Page.tsx";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

const ErrorPage = ({ error }) => {
  const { auth } = useContext(AuthContext);
  if (error.response.data.statusCode == "404") return <Error404Page />;
  if (error.response.data.statusCode == "403" && auth.isAuthenticated)
    return <Error403Page />;

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
