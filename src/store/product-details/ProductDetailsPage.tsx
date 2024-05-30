import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Form, InputGroup } from "react-bootstrap";
import { storeFetcher } from "../services/CustomerServices.ts";
import Select from "react-select";

const ProductDetailsCustomerPage = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useSWR(
    ["/products", productId],
    ([url, arg]) => storeFetcher(url + "/" + arg?.toString())
  );

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  const categories = data.categories.map((category) => {
    return {
      value: null,
      label: category,
    };
  });
  return (
    <div className="container">
      <h1>{data.name}</h1>
      <Form>
        <Form.Group controlId="productDesc">
          <Form.Label>Product Descriptions</Form.Label>
          <Form.Control type="text" defaultValue={data.desc} disabled />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type="number"
              defaultValue={data.salePrice}
              disabled
            />
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Select
            defaultValue={categories}
            options={categories}
            isDisabled
            isMulti
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProductDetailsCustomerPage;
