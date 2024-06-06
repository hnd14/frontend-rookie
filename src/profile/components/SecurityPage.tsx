import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PasswordWrapper from "../../components/PasswordWrapper.tsx";
import SubmitButton from "../../components/SubmitButton.jsx";
import { updatePassword } from "../../login/services/LoginService.ts";
import { useNavigate } from "react-router-dom";

const SecurityPage = () => {
  const [validated, setValidated] = useState(false);
  const [oldPasswordType, setOldPassWordType] = useState("password");
  const [passwordType, setPassWordType] = useState("password");
  const [passwordReType, setPassWordReType] = useState("password");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const formData = new FormData(form);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("password");
    const newPasswordRe = formData.get("passwordRe");
    setValidated(true);
    if (form.checkValidity() === false) {
    } else if (newPassword != newPasswordRe) {
      alert("Your new passwords do not match");
    } else {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      updatePassword(data)
        .then(() => {
          alert("Update password successfully!");
          nav("/me");
        })
        .catch(() => {
          alert("Failed to update password");
        });
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Label>Old password</Form.Label>
          <PasswordWrapper
            showPassword={() => {
              setOldPassWordType("text");
            }}
            hidePassword={() => {
              setOldPassWordType("password");
            }}
          >
            <Form.Control
              name="oldPassword"
              type={oldPasswordType}
              required
              maxLength={100}
            />
          </PasswordWrapper>
        </Form.Group>
        <Form.Group>
          <Form.Label>New password</Form.Label>
          <PasswordWrapper
            showPassword={() => {
              setPassWordType("text");
            }}
            hidePassword={() => {
              setPassWordType("password");
            }}
          >
            <Form.Control
              name="password"
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
          <Form.Label>Repeat new password</Form.Label>
          <PasswordWrapper
            showPassword={() => {
              setPassWordReType("text");
            }}
            hidePassword={() => {
              setPassWordReType("password");
            }}
          >
            <Form.Control
              name="passwordRe"
              type={passwordReType}
              required
              minLength={6}
              maxLength={100}
            />
          </PasswordWrapper>
        </Form.Group>
        <SubmitButton>Update</SubmitButton>
      </Form>
    </>
  );
};

export default SecurityPage;
