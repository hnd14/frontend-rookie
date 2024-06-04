import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  getAllCategories,
  getProducts,
  updateProduct,
} from "../services/AdminService.ts";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Select from "react-select";
import { NewProductItem } from "../product/model/NewProductItem.ts";
import SubmitButton from "../../components/SubmitButton.jsx";
import { formatTime } from "../../util/Util.ts";

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
    data: cateData,
    error: error_2,
    isLoading: isLoading_2,
  } = useSWR(["/categories", 1], ([url, arg]) => getAllCategories(arg));

  if (error || error_2) return <h1>Error</h1>;
  if (isLoading || isLoading_2 || !data.categoriesInfo || !cateData.content)
    return <h1>Loading...</h1>;

  const options = () =>
    cateData.content.map((category) => {
      return {
        value: category.id,
        label: category.name,
      };
    });

  const selected = () =>
    data.categoriesInfo.map((category) => ({
      value: category.id,
      label: category.name,
    }));

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
      updateProduct(Number(productId), data)
        .then(() => {
          alert("Update product successfully!");
          mutate();
          nav("/admin/products");
        })
        .catch(() => {
          alert("Update product failed");
        });
    }

    setValidated(true);
  };
  return (
    <div className="container">
      <h1>
        <b>{data.name}</b>
      </h1>
      <Button
        variant="dark"
        onClick={() => {
          nav(`/admin/products/images/${productId}`);
        }}
      >
        Edit images data
      </Button>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="productDesc">
          <Form.Label>
            <b>Product Descriptions</b>
          </Form.Label>
          <Form.Control type="text" name="desc" defaultValue={data.desc} />
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
              defaultValue={data.salePrice / 1000}
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
            defaultValue={data.stock}
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
          <Form.Check
            name="featured"
            defaultChecked={data.isFeatured}
          ></Form.Check>
        </Form.Group>
        <Form.Label>
          <b>Categories</b>
        </Form.Label>
        <Select
          options={options()}
          isMulti={true}
          ref={categoriesRef}
          defaultValue={selected()}
        ></Select>
        <Form.Group>
          <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Last updated</b>
          </Form.Label>
          <Row>
            <Col>
              <Form.Label>
                <b>At:</b>
                {" " + formatTime(data.updatedTime)}
              </Form.Label>
            </Col>
            <Col>
              <Form.Label>
                <b>By:</b>
                {" " + data.updatedBy}
              </Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Created by</b>
          </Form.Label>
          <Row>
            <Col>
              <Form.Label>
                <b>At:</b>
                {" " + formatTime(data.createdTime)}
              </Form.Label>
            </Col>
            <Col>
              <Form.Label>
                <b>By:</b>
                {" " + data.createdBy}
              </Form.Label>
            </Col>
          </Row>
        </Form.Group>
        <SubmitButton goBackLink="/admin/products">Update product</SubmitButton>
      </Form>
    </div>
  );
};

export default ProductDetailsPage;
