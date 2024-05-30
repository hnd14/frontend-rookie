import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  getAllCategories,
  getProducts,
  updateProduct,
} from "../services/AdminService.ts";
import { Button, Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { NewProductItem } from "../product/model/NewProductItem.ts";

const ProductDetailsPage = () => {
  const [validated, setValidated] = useState(false);
  const { productId } = useParams();
  const nav = useNavigate();
  const { data, error, isLoading, mutate } = useSWR(
    ["/products", productId],
    ([url, arg]) => getProducts(arg || "")
  );
  const categoriesRef = useRef(null);
  const {
    data: data_2,
    error: error_2,
    isLoading: isLoading_2,
  } = useSWR(["/categories", 1], ([url, arg]) => getAllCategories(arg));

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (error_2) return <h1>Error</h1>;
  if (isLoading_2) return <h1>Loading...</h1>;

  const options = data_2.content.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const selected = data.categoriesInfo.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
      console.log(data);
      updateProduct(Number(productId), data)
        .then(() => {
          alert("Update product successfully!");
          mutate();
          nav("/admin");
        })
        .catch(() => {
          alert("Update product failed");
        });
    }

    setValidated(true);
  };
  return (
    <div className="container">
      <h1>{data.name}</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="productDesc">
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" defaultValue={data.desc} />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type="number"
              defaultValue={data.salePrice}
            />
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control required defaultValue={data.stock} type="number" />
        </Form.Group>
        <Form.Group controlId="productIsFeatured">
          <Form.Check.Label>Featured</Form.Check.Label>
          <Form.Check defaultChecked={data.isFeatured}></Form.Check>
        </Form.Group>
        <Select
          options={options}
          isMulti={true}
          ref={categoriesRef}
          defaultValue={selected}
        ></Select>
        <Button variant="dark" type="submit">
          Update product
        </Button>
      </Form>
    </div>
  );
};

export default ProductDetailsPage;
