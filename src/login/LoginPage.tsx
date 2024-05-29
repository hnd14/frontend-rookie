import React from "react";
import LoginForm from "./components/LoginForm.jsx";

export const LoginPage = () => {
  return (
    <div className="container text-start m-3">
      <div className="jumbotron m-2">
        <h1 className="display-4">Welcome to my shop</h1>
      </div>
      <div className="container text-start">
        <LoginForm />
      </div>
    </div>
  );
};
