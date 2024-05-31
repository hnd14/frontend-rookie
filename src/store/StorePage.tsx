import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, NavItem } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import LogOutButton from "../components/LogOutButton.tsx";

const StorePage = () => {
  const nav = useNavigate();
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Navbar
        data-bs-theme="dark"
        className="border-bottom p-0 bg-secondary bg-gradient"
      >
        <Nav justify variant="tabs" style={{ width: "50%" }}>
          <Nav.Item>
            <Nav.Link onClick={() => nav("/")} active={true}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => nav("/products")} active={true}>
              Store
            </Nav.Link>
          </Nav.Item>
          <NavItem>
            <Nav.Link onClick={() => nav("/")} active={true}>
              Contact
            </Nav.Link>
          </NavItem>
        </Nav>
        {auth.isAuthenticated ? (
          <LogOutButton />
        ) : (
          <Container className="ms-auto">
            <Button
              className="ms-auto me-1"
              variant="dark"
              onClick={() => {
                nav("/login");
              }}
            >
              Log in
            </Button>{" "}
            <Button
              className="ms-1"
              variant="dark"
              onClick={() => {
                nav("/signup");
              }}
            >
              Sign up
            </Button>
            {""}
          </Container>
        )}
      </Navbar>

      <Outlet />
    </>
  );
};

export default StorePage;
