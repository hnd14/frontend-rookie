import React from "react";
import { Button, Card, CardText, CardTitle } from "react-bootstrap";
import { ProductThumbnail } from "../model/Product";
import { useNavigate } from "react-router-dom";
interface Props {
  data: ProductThumbnail;
}
const ProductCard = ({ data }: Props) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/products/${data.id}`);
  };
  return (
    <Card
      style={{ width: "17rem" }}
      onClick={handleClick}
      className="text-center m-1"
    >
      <Card.Img
        variant="top"
        src={data.thumbnail_src}
        alt={`Image for ${data.name}`}
      ></Card.Img>
      <CardTitle>{data.name}</CardTitle>
      <CardText>
        <b>{data.salePrice.toString()}</b> VND
      </CardText>
      <Button onClick={handleClick} variant="dark" className="m-1">
        View details
      </Button>
    </Card>
  );
};

export default ProductCard;