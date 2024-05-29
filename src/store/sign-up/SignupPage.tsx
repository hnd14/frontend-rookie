import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const SignupPage = () => {
  return (
    <>
      <Container>
        <h1>Sign up</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" required minLength={10} maxLength={100} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              maxLength={100}
            />
          </Form.Group>
        </Form>
        <Button className="mt-1" variant="dark" type="submit">
          Sign up
        </Button>
      </Container>
    </>
  );
};

export default SignupPage;
