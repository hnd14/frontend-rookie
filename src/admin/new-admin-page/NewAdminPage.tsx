import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createNewAdmin } from "../services/AdminService.ts";

const NewAdminPage = () => {
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const password = formData.get("password");
    const passwordRe = formData.get("passwordRe");
    if (form.checkValidity() === false || password != passwordRe) {
      if (password != passwordRe) {
        alert("Your password do not match!");
      }
      event.stopPropagation();
    } else {
      const data = {
        username: formData.get("username"),
        password: password,
      };
      createNewAdmin(data)
        .then(() => {
          alert("New admin account has been registered");
          nav("/admin/users");
        })
        .catch((error) => {
          alert("This username has been used!");
        });
    }
    setValidated(true);
  };
  return (
    <>
      <Container>
        <h1>Create new admin</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              required
              minLength={10}
              maxLength={100}
              pattern="[^_]+"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
          </Form.Group>
          <Form.Group controlId="password-repeat">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              name="passwordRe"
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
          </Form.Group>
          <Button className="mt-1" variant="dark" type="submit">
            Sign up
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewAdminPage;
