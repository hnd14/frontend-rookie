import React, { useRef } from "react";
import { login } from "../services/LoginService.ts";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(document.createElement("input"));
  const passwordRef = useRef(document.createElement("input"));

  const validateData = (username, password) => {
    if (username.length < 1) {
      alert("Username must not be empty!");
      return false;
    }
    if (password.length < 1) {
      alert("Password must not be empty!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateData(usernameRef.current.value, passwordRef.current.value)) {
      const data = {
        username: usernameRef.current.value,
        rawPassword: passwordRef.current.value,
      };
      login(data)
        .then((response) => {
          navigate("/admin");
        })
        .catch((error) => {
          alert("Username or password is wrong!");
          navigate("/login");
        });
    }
  };

  return (
    <div className="border container-fluid" style={{ width: "500px" }}>
      <h1 className="m-1">Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group m-1">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="username"
          />
        </div>

        <div className="form-group m-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;