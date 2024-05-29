import React from "react";
import { Navbar, Nav, Container, Button, NavItem } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const StorePage = () => {
  const nav = useNavigate();
  return (
    <>
      <Navbar data-bs-theme="dark" className="border-bottom p-0">
        <Nav justify variant="tabs" style={{ width: "50%" }}>
          <Nav.Item>
            <Nav.Link href="/" active={true}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" active={true}>
              Store
            </Nav.Link>
          </Nav.Item>
          <NavItem>
            <Nav.Link href="/" active={true}>
              Contact
            </Nav.Link>
          </NavItem>
        </Nav>
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
      </Navbar>

      <Outlet />
    </>
  );
};

export default StorePage;
