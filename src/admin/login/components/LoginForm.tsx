import React, { useRef } from "react";
import { login } from "../../services/AdminService.ts";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSubmit = (event) => {
    const data = {
      username: usernameRef.current.value,
      rawPassword: passwordRef.current.value,
    };
    login(data)
      .then((response) => {
        let data = response.data;
        window.sessionStorage.setItem("accessToken", data["accessToken"]);
        window.sessionStorage.setItem("isAdmin", data["isAdmin"]);
        window.sessionStorage.setItem("isCustomer", data["isCustomer"]);
        navigate("/admin");
      })
      .catch((error) => {
        alert("Username or password is wrong!");
        navigate("/login");
      });
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
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

      <div className="mb-3">
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
