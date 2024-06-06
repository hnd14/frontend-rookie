import React, { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  Navbar,
  Row,
} from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import LogOutButton from "../components/LogOutButton.tsx";
import SideBar from "../components/SideBar.tsx";

const ProfilePage = () => {
  const { auth } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <>
      <Navbar
        data-bs-theme="dark"
        className="border-bottom p-0 bg-secondary bg-gradient"
      >
        <Nav justify variant="tabs" style={{ width: "50%" }}>
          <Nav.Item>
            <Nav.Link onClick={() => nav("/")} active={true}>
              Store
            </Nav.Link>
          </Nav.Item>
          {auth.roles?.includes("ROLE_ADMIN") ? (
            <Nav.Item>
              <Nav.Link onClick={() => nav("/admin/products")} active={true}>
                Admin
              </Nav.Link>
            </Nav.Item>
          ) : (
            <></>
          )}
          <NavItem>
            <Nav.Link disabled onClick={() => nav("/")} active={false}>
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
      <Row>
        <Col xs={2}>
          <SideBar
            title={"Profile Page"}
            links={[
              { label: "General", link: "/me" },
              { label: "Security", link: "/me/security" },
            ]}
          ></SideBar>
        </Col>
        <Col xs={10} className="justify-content-start">
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
