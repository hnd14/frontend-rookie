import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SubmitButton = ({ children = "", goBackLink = "" }) => {
  const nav = useNavigate();
  return (
    <Container className="mt-3 ms-0">
      <Button type="submit" variant="dark" className="me-1">
        {children}
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          nav(0);
        }}
        className="me-1"
      >
        Reset
      </Button>
      {goBackLink != "" ? (
        <Button
          variant="dark"
          onClick={() => {
            nav(goBackLink);
          }}
        >
          Go back
        </Button>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SubmitButton;
