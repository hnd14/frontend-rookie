import React from "react";
import LoginForm from "./components/LoginForm.jsx";

export const LoginPage = () => {
  return (
    <div className="container text-start m-3">
      <h1>Log in</h1>
      <div className="container text-start">
        <LoginForm />
      </div>
    </div>
  );
};
