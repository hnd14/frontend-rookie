import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { NewProductItem } from "../../product/model/NewProductItem";
import Select from "react-select";
import {
  createNewProducts,
  getAllCategories,
} from "../../services/AdminService.ts";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

const NewProductForm = () => {
  const [validated, setValidated] = useState(false);
  const categoriesRef = useRef(null);
  const { data, error, isLoading } = useSWR(["/categories", 1], ([url, arg]) =>
    getAllCategories(arg)
  );
  const nav = useNavigate();
  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;
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
        categoriesId: categoriesRef.current.getValue().map((catOption) => {
          return catOption.value;
        }),
      };
      createNewProducts(data)
        .then(() => {
          alert("Create product sucessfully");
          nav("/admin");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to create product");
        });
    }

    setValidated(true);
  };
  const options = data.content.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  return (
    <div className="container" style={{ "max-width": "800px" }}>
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
        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Select options={options} isMulti={true} ref={categoriesRef}></Select>
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Create product
        </Button>
      </Form>
    </div>
  );
};

export default NewProductForm;
