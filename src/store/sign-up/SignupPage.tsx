import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { SignUpData } from "./model/SignUpData";
import { signUp } from "../services/CustomerServices.ts";
import { redirect, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
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
          nav("/login");
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
            <Form.Control
              type="text"
              required
              minLength={10}
              maxLength={100}
              pattern="[^_]+"
            />
            <Form.Control.Feedback type="invalid">
              Username must stay between 10-100 characters without using the "_"
              character!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
            <Form.Control.Feedback type="invalid">
              Email is not valid!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              Password must stay between 6 and 100 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password-repeat">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              Password must stay between 6 and 100 characters.
            </Form.Control.Feedback>
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
