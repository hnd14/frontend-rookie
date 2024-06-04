import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";

const PasswordWrapper = ({ children, showPassword, hidePassword }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <InputGroup>
        {children}
        <InputGroup.Text>
          {show ? (
            <i
              className="bi bi-eye-slash"
              onClick={() => {
                hidePassword();
                setShow(false);
              }}
            ></i>
          ) : (
            <i
              className="bi bi-eye"
              onClick={() => {
                showPassword();
                setShow(true);
              }}
            ></i>
          )}
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default PasswordWrapper;
