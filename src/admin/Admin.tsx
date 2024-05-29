import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../login/services/LoginService.ts";

const Admin = () => {
  const nav = useNavigate();
  return (
    <>
      <Navbar data-bs-theme="dark" className="border-bottom p-0">
        <Nav justify variant="tabs" style={{ width: "50%" }}>
          <Nav.Item>
            <Nav.Link eventKey="products" href="/admin" active={true}>
              Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="categories"
              href="/admin/categories"
              active={true}
            >
              Categories
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Container>
          <Button
            className="ms-auto"
            variant="dark"
            onClick={() => {
              logout().then(() => {
                nav("/");
              });
            }}
          >
            Log out
          </Button>
        </Container>
        {""}
      </Navbar>

      <Outlet />
    </>
  );
};

export default Admin;
