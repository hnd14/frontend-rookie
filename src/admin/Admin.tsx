import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import LogOutButton from "../components/LogOutButton.tsx";

const Admin = () => {
  const nav = useNavigate();
  return (
    <>
      <Navbar
        data-bs-theme="dark"
        className="border-bottom p-0 bg-secondary bg-gradient"
      >
        <Nav justify variant="tabs" style={{ width: "50%" }}>
          <Nav.Item>
            <Nav.Link
              eventKey="products"
              onClick={() => nav("/admin/products")}
              active={true}
            >
              Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="categories"
              active={true}
              onClick={() => nav("/admin/categories")}
            >
              Categories
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="users"
              active={true}
              onClick={() => nav("/admin/users")}
            >
              Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="store" active={true} onClick={() => nav("/")}>
              Store
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <LogOutButton />
        {""}
      </Navbar>

      <Outlet />
    </>
  );
};

export default Admin;
