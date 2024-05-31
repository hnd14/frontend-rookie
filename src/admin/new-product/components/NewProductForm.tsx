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
      const formData = new FormData(form);
      const data: NewProductItem = {
        name: formData.get("name")?.toString() || "",
        desc: formData.get("desc")?.toString() || "",
        salePrice: Number(formData.get("price") * 1000),
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
          <Form.Label>Product Name</Form.Label>
          <Form.Control required type="text" name="name" />
        </Form.Group>
        <Form.Group controlId="productDesc">
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" name="desc" />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label name="price">Price</Form.Label>
          <InputGroup>
            <Form.Control required type="number" name="price" />
            <InputGroup.Text>000</InputGroup.Text>
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control required defaultValue={0} type="number" name="stock" />
        </Form.Group>
        <Form.Group controlId="productIsFeatured">
          <Form.Check.Label>Featured</Form.Check.Label>
          <Form.Check name="featured"></Form.Check>
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
