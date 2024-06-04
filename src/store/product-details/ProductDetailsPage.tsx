import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import {
  Form,
  InputGroup,
  Image,
  Carousel,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { storeFetcher, updateRating } from "../services/CustomerServices.ts";
import Select from "react-select";
import { IMAGES_HOST } from "../../const/Util.ts";
import RatingProduct from "../components/RatingProduct.tsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import ShowingRating from "./components/ShowingRating.tsx";
import StaticStar from "./components/StaticStar.tsx";
import { formatPrice } from "../../util/Util.ts";

const ProductDetailsCustomerPage = () => {
  const { productId } = useParams();
  const { auth } = useContext(AuthContext);
  const { data, error, isLoading } = useSWR(
    ["/products", productId],
    ([url, arg]) => storeFetcher(url + "/" + arg?.toString())
  );
  const { data: ratingData, isLoading: ratingLoading } = useSWR(
    `/products/${productId}/ratings/me`,
    (url) => storeFetcher(url),
    { shouldRetryOnError: auth.isAuthenticated, suspense: auth.isAuthenticated }
  );

  if (error) return <h1>Error</h1>;
  if (isLoading || !data.categories || ratingLoading)
    return <h1>Loading...</h1>;
  if (auth.isAuthenticated && !ratingData) return <h1>Loading...</h1>;
  if (
    auth.isAuthenticated &&
    (ratingData.username != auth.username ||
      ratingData.productId.toString() != productId)
  )
    return <h1>Loading...</h1>;
  const categories = () =>
    data.categories.map((category) => {
      return {
        value: null,
        label: category,
      };
    });

  const handleRating = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ratingData = {
      scores: formData.get("rating"),
      comment: formData.get("comment"),
    };
    updateRating(productId, ratingData)
      .then(() => {
        mutate(
          mutate(
            (key) =>
              typeof key === "string" &&
              key.startsWith(`/products/${productId}/ratings`)
          )
        );
        alert("Rating updated");
      })
      .catch((error) => {
        alert("Failed to update rating");
      });
  };

  return (
    <Container>
      <h1>
        <b>{data.name}</b>
      </h1>
      <Row>
        <Col xs={8}>
          <Carousel>
            {data.imagesUrl.map((url) => (
              <Carousel.Item>
                {" "}
                <Image
                  src={IMAGES_HOST + url}
                  height={"400px"}
                  width={"100%"}
                ></Image>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <Form>
            <Form.Group controlId="productDesc">
              <Form.Label>
                <b>Product Descriptions</b>
              </Form.Label>
              <Form.Control type="text" defaultValue={data.desc} plaintext />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>
                <b>Price</b>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type="text"
                  defaultValue={`${formatPrice(data.salePrice)} VND`}
                  plaintext
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Categories</b>
              </Form.Label>
              <Select
                defaultValue={categories()}
                options={categories()}
                isDisabled
                isMulti
              />
            </Form.Group>
          </Form>
          <StaticStar score={data.averageScore || 0} size="h1" />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <ShowingRating productId={productId} />
        </Col>
        <Col>
          {auth.isAuthenticated ? (
            ratingData ? (
              <RatingProduct
                handleSubmit={handleRating}
                defaultValue={ratingData.scores}
                defaultComment={ratingData.comment || ""}
              ></RatingProduct>
            ) : (
              <RatingProduct handleSubmit={handleRating}></RatingProduct>
            )
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsCustomerPage;
