import React, { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { ProductThumbnail } from "../model/Product";
import ProductCard from "./ProductCard.tsx";
import { Button, Col, Container, Row } from "react-bootstrap";
interface Props {
  data: ProductThumbnail[];
  title: String;
}
const ProductCarousel = ({ data, title = "" }: Props) => {
  const [index, setIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const pixelToRem = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  useEffect(() => {
    setCardsPerSlide(
      Math.max(1, Math.round(window.innerWidth / pixelToRem / 18) - 1)
    );

    const updateMedia = () => {
      setCardsPerSlide(
        Math.max(1, Math.round(window.innerWidth / pixelToRem / 18) - 1)
      );
      setIndex(0);
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [pixelToRem]);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const cards = data.map((product) => <ProductCard data={product} />);

  const sliceNumber = Math.ceil(data.length / cardsPerSlide);
  const items: React.JSX.Element[] = [];
  for (let i = 0; i < sliceNumber - 1; i++) {
    items.push(
      <Carousel.Item as={Col} className="col-10">
        <Row>
          {cards
            .slice(i * cardsPerSlide, i * cardsPerSlide + cardsPerSlide)
            .map((card) => (
              <Col>{card}</Col>
            ))}
        </Row>
      </Carousel.Item>
    );
  }
  items.push(
    <Carousel.Item as={Col} className="col-10">
      <Row>
        {cards
          .slice(Math.max(0, cards.length - cardsPerSlide), cards.length)
          .map((card) => (
            <Col>{card}</Col>
          ))}
      </Row>
    </Carousel.Item>
  );

  return (
    <>
      <Container>
        <h2>{title}</h2>
        <Row className="d-flex justify-content-start">
          <Col xs={2}>
            <Button
              variant="dark"
              className="me-1 justify-content-center"
              disabled={index == 0 ? true : false}
              onClick={() => {
                setIndex((i) => i - 1);
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
            <Button
              variant="dark"
              className="justify-content-center"
              disabled={index == sliceNumber - 1 ? true : false}
              onClick={() => {
                setIndex((i) => i + 1);
              }}
            >
              <i className="bi bi-arrow-right "></i>
            </Button>
          </Col>
        </Row>
        <Container className="d-flex justify-content-center">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
            indicators={false}
            as={Row}
            controls={false}
          >
            {items}
          </Carousel>
        </Container>
      </Container>
    </>
  );
};

export default ProductCarousel;
