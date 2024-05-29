import React, { useRef } from "react";
import { createNewCategory } from "../../services/AdminService.ts";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const NewCategoryForm = () => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const desc = descRef.current.value;
    createNewCategory({ name, desc })
      .then(() => {
        alert("Category created");
        nav("/admin/categories");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.detail);
        nav("/admin/new-categories");
      });
  };
  return (
    <Container>
      <h1>New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            className="form-control"
            type="text"
            id="categoryName"
            ref={nameRef}
          />
          <label htmlFor="categoryDesc" className="form-label">
            Category descriptions
          </label>
          <input
            className="form-control"
            type="text"
            id="categoryDesc"
            ref={descRef}
          />
        </div>
        <button className="btn btn-dark m-1" type="submit">
          Create new category
        </button>
      </form>
    </Container>
  );
};

export default NewCategoryForm;
