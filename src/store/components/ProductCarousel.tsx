import React, { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { ProductThumbnail } from "../model/Product";
import ProductCard from "./ProductCard.tsx";
import { Col, Container, Row } from "react-bootstrap";
interface Props {
  data: ProductThumbnail[];
}
const ProductCarousel = ({ data }: Props) => {
  const [index, setIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const pixelToRem = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  useEffect(() => {
    setCardsPerSlide(
      Math.max(1, Math.floor(window.innerWidth / pixelToRem / 18) - 1)
    );

    const updateMedia = () => {
      setCardsPerSlide(
        Math.max(1, Math.floor(window.innerWidth / pixelToRem / 18) - 1)
      );
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [pixelToRem]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  console.log(cardsPerSlide);

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
        {cards.slice(cards.length - cardsPerSlide, cards.length).map((card) => (
          <Col>{card}</Col>
        ))}
      </Row>
    </Carousel.Item>
  );

  return (
    <Container className="d-flex justify-content-center">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        variant="dark"
        indicators={false}
        as={Row}
      >
        {items}
      </Carousel>
    </Container>
  );
};

export default ProductCarousel;
