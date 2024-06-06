import React from "react";
import { Nav, Navbar, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
  links: { link; label }[];
}
const SideBar = ({ title = "", links }: Props) => {
  const nav = useNavigate();
  return (
    <Nav
      as={"div"}
      className="bg-secondary start-0 position-fixed"
      style={{
        height: "100%",
        width: "auto",
        position: "absolute",
        boxSizing: "border-box",
      }}
    >
      <Stack gap={1}>
        <Navbar.Brand className="p-1 fs-2 fw-bold " style={{ color: "white" }}>
          {title}
        </Navbar.Brand>
        {links.map((item) => (
          <Nav.Item style={{ width: "100%", color: "white" }}>
            <Nav.Link
              className="p-1 fs-5 bg-dark link-light"
              onClick={() => {
                nav(item.link);
              }}
            >
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Stack>
    </Nav>
  );
};

export default SideBar;
