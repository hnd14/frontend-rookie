import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { SignUpData } from "./model/SignUpData";
import { signUp } from "../services/CustomerServices.ts";
import { useNavigate } from "react-router-dom";
import PasswordWrapper from "../../components/PasswordWrapper.tsx";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const [passwordType, setPassWordType] = useState("password");
  const [passwordReType, setPassWordReType] = useState("password");
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const password = document.getElementById("password")?.value;
    const passwordRe = document.getElementById("password-repeat")?.value;
    if (form.checkValidity() === false || password != passwordRe) {
      if (password != passwordRe) {
        alert("Passwords not match!");
      }
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
            <PasswordWrapper
              showPassword={() => {
                setPassWordType("text");
              }}
              hidePassword={() => {
                setPassWordType("password");
              }}
            >
              <Form.Control
                type={passwordType}
                required
                minLength={6}
                maxLength={100}
              />
            </PasswordWrapper>

            <Form.Control.Feedback type="invalid">
              Password must stay between 6 and 100 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password-repeat">
            <Form.Label>Repeat password</Form.Label>
            <PasswordWrapper
              showPassword={() => {
                setPassWordReType("text");
              }}
              hidePassword={() => {
                setPassWordReType("password");
              }}
            >
              <Form.Control
                type={passwordReType}
                required
                minLength={6}
                maxLength={100}
              />
            </PasswordWrapper>

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
