import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { createNewCategory } from "../../services/AdminService.ts";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton.jsx";

const NewCategoryFormV2 = () => {
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const name = formData.get("name");
      const desc = formData.get("desc");
      createNewCategory({ name, desc })
        .then(() => {
          alert("Category created");
          nav("/admin/categories");
        })
        .catch((error) => {
          alert(error.response.data.detail);
          nav("/admin/new-categories");
        });
    }
    setValidated(true);
  };
  return (
    <Container>
      <h1>New Category</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group>
          <Form.Label>
            <b>Category name</b>
          </Form.Label>
          <Form.Control
            type="text"
            id="categoryName"
            name="name"
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            You need to put in category name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Category description</b>
          </Form.Label>
          <Form.Control type="text" name="desc"></Form.Control>
        </Form.Group>

        <SubmitButton goBackLink="/admin/categories">
          Create category
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default NewCategoryFormV2;
