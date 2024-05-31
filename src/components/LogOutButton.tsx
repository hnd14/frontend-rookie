import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { logout } from "../login/services/LoginService.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";

const LogOutButton = () => {
  const nav = useNavigate();
  const { setAuth } = useContext(AuthContext);
  return (
    <Container>
      <Button
        className="ms-auto"
        variant="dark"
        onClick={() => {
          logout().then(() => {
            setAuth({ isAuthenticated: false });
            nav("/");
          });
        }}
      >
        Log out
      </Button>
    </Container>
  );
};

export default LogOutButton;
