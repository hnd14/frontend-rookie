import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getProducts } from "../services/AdminService.ts";
import { Button, Form, InputGroup } from "react-bootstrap";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  console.log(productId);
  const { data, error, isLoading } = useSWR(
    ["/products", productId],
    ([url, arg]) => getProducts(arg || "")
  );
  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  const handleSubmit = () => {};
  return (
    <div className="container">
      <h1>New product</h1>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control required type="text" value={data.name} disabled />
        </Form.Group>
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
          <Form.Check checked={data.isFeatured}></Form.Check>
        </Form.Group>
        <Button variant="dark" type="submit">
          Create product
        </Button>
      </Form>
    </div>
  );
};

export default ProductDetailsPage;
