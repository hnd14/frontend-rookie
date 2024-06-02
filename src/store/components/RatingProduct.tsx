import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Container, Button } from "react-bootstrap";

const RatingProduct = ({
  defaultValue = 0,
  defaultComment = "",
  handleSubmit,
}) => {
  const [filledStar, setFilledStar] = useState(defaultValue);
  const [rating, setRating] = useState(defaultValue);
  return (
    <Container>
      <h3>
        <b>Rates this product</b>
      </h3>

      <Container onMouseLeave={() => setFilledStar(rating)}>
        {[...Array(filledStar)].map((i, index) => (
          <i
            className="bi bi-star-fill h3"
            style={{ color: "gold" }}
            onMouseEnter={() => setFilledStar(index + 1)}
            onClick={() => setRating(index + 1)}
          />
        ))}
        {[...Array(5 - filledStar)].map((i, index) => (
          <i
            className="bi bi-star h3"
            style={{ color: "gold" }}
            onMouseEnter={() => setFilledStar(5 - index)}
            onClick={() => setRating(5 - index)}
          />
        ))}
      </Container>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="rating"
          type="number"
          value={rating}
          className="d-none"
        />
        <Form.Group>
          <Form.Label>
            <b>Leave a comment</b>
          </Form.Label>
          <Form.Control
            type="text"
            name="comment"
            defaultValue={defaultComment}
          />
        </Form.Group>
        <Button variant="dark" className="mt-2 ms-2" type="submit">
          Rate
        </Button>
      </Form>
    </Container>
  );
};

export default RatingProduct;
