import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/admin/products">
              Products
            </Link>
            <Link className="nav-link" to="/admin/categories">
              Categories
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Admin;
