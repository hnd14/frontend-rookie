import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const NewProductForm = () => {
  return (
    <div className="container">
      <h1>New product</h1>
      <Form>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <Form.Control type="number" />
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group>
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
