import React, { useRef } from "react";
import { login } from "../../services/AdminService.ts";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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

      <div className="form-group">
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

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
