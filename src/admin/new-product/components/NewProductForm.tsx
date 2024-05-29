import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { NewProductItem } from "../../product/model/NewProductItem";
import { createNewProducts } from "../../services/AdminService.ts";

const NewProductForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data: NewProductItem = {
        name: document.getElementById("productName")?.value,
        desc: document.getElementById("productDesc")?.value,
        salePrice: document.getElementById("productPrice")?.value,
        stock: document.getElementById("productStock")?.value,
        isFeatured: document.getElementById("productIsFeatured")?.checked,
      };
      console.log(data);
      createNewProducts(data).then(() => {
        alert("Create product sucessfully");
      });
    }

    setValidated(true);
  };
  return (
    <div className="container">
      <h1>New product</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control required type="text" />
        </Form.Group>
        <Form.Group controlId="productDesc">
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <Form.Control required type="number" />
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control required defaultValue={0} type="number" />
        </Form.Group>
        <Form.Group controlId="productIsFeatured">
          <Form.Check.Label>Featured</Form.Check.Label>
          <Form.Check></Form.Check>
        </Form.Group>
        <Button variant="dark" type="submit">
          Create product
        </Button>
      </Form>
    </div>
  );
};

export default NewProductForm;
