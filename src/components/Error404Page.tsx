import React from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Stack className="d-flex justify-content-center align-items-center">
          <div>
            <h1 className="fw-b align-top align-content-center">404</h1>
          </div>

          <div className="block align-middle">
            <h2 className="font-weight-normal lead" id="desc">
              The page you requested was not found.
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

export default Error404Page;
