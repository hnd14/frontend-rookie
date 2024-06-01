import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Form, InputGroup, Image, Carousel, Row, Col } from "react-bootstrap";
import { storeFetcher, updateRating } from "../services/CustomerServices.ts";
import Select from "react-select";
import { IMAGES_HOST } from "../../const/Util.ts";
import RatingProduct from "../components/RatingProduct.tsx";
import { AuthContext } from "../../context/AuthProvider.jsx";

const ProductDetailsCustomerPage = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useSWR(
    ["/products", productId],
    ([url, arg]) => storeFetcher(url + "/" + arg?.toString())
  );
  const { auth } = useContext(AuthContext);
  const { data: ratingData } = useSWR(() => {
    return auth.isAuthenticated ? `/products/${productId}/ratings/me` : null;
  }, storeFetcher);

  if (error) return <h1>Error</h1>;
  if (isLoading || !data.categories) return <h1>Loading...</h1>;
  if (auth.isAuthenticated && !ratingData) return <h1>Loading...</h1>;
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
        alert("Rating updated");
      })
      .catch(() => {
        alert("Failed to update rating");
      });
  };

  return (
    <div className="container">
      <h1>{data.name}</h1>
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
                  defaultValue={`${data.salePrice} VND`}
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
    </div>
  );
};

export default ProductDetailsCustomerPage;
