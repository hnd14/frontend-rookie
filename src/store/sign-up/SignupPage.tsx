import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { SignUpData } from "./model/SignUpData";
import { signUp } from "../services/CustomerServices.ts";
import { redirect } from "react-router-dom";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const password = document.getElementById("password")?.value;
    const passwordRe = document.getElementById("password-repeat")?.value;
    if (form.checkValidity() === false || password != passwordRe) {
      event.stopPropagation();
    } else {
      const data: SignUpData = {
        username: document.getElementById("username")?.value,
        password: password,
        email: document.getElementById("email")?.value,
      };
      signUp(data)
        .then(() => {
          alert("Your account has been registered");
          redirect("/login");
        })
        .catch((error) => {
          alert("This username or emailed has been used!");
        });
    }
    setValidated(true);
  };
  return (
    <>
      <Container>
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" required minLength={10} maxLength={100} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
          </Form.Group>
          <Form.Group controlId="password-repeat">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
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

export default SignUpPage;
