import React, { useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { NewProductItem } from "../../product/model/NewProductItem";
import Select from "react-select";
import {
  createNewProducts,
  getAllCategories,
} from "../../services/AdminService.ts";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton.jsx";

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
      const formData = new FormData(form);
      const data: NewProductItem = {
        name: formData.get("name")?.toString() || "",
        desc: formData.get("desc")?.toString() || "",
        salePrice: Number(formData.get("price")) * 1000,
        stock: Number(formData.get("stock")),
        isFeatured: Boolean(formData.get("featured")),
        categoriesId: categoriesRef.current.getValue().map((catOption) => {
          return catOption.value;
        }),
      };
      createNewProducts(data)
        .then((res) => {
          alert("Create product sucessfully");
          nav("/admin/products/images/" + res.data.id.toString());
        })
        .catch((error) => {
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
    <div className="container" style={{ maxWidth: "800px" }}>
      <h1>New product</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="productName">
          <Form.Label>
            <b>Product Name</b>
          </Form.Label>
          <Form.Control required type="text" name="name" />
          <Form.Control.Feedback type="invalid">
            Product name must not be empty!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="productDesc">
          <Form.Label>
            <b>Product Descriptions</b>
          </Form.Label>
          <Form.Control type="text" name="desc" />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label name="price">
            <b>Price</b>
          </Form.Label>
          <InputGroup>
            <Form.Control
              required
              type="number"
              name="price"
              step={0.5}
              min={0}
            />
            <InputGroup.Text>000</InputGroup.Text>
            <InputGroup.Text>VND</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Price must be a non-negative number that is a multiple of 500VND
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>
            <b>Stock</b>
          </Form.Label>
          <Form.Control
            required
            defaultValue={0}
            type="number"
            name="stock"
            min={0}
          />
          <Form.Control.Feedback type="invalid">
            Stock must be a non-negative integer
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="productIsFeatured">
          <Form.Check.Label>
            <b>Featured</b>
          </Form.Check.Label>
          <Form.Check name="featured"></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Categories</b>
          </Form.Label>
          <Select options={options} isMulti={true} ref={categoriesRef}></Select>
        </Form.Group>
        <SubmitButton goBackLink="/admin/products">Create product</SubmitButton>
      </Form>
    </div>
  );
};

export default NewProductForm;
