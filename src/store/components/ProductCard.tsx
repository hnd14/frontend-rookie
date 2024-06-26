import React from "react";
import { Button, Card, CardText, CardTitle } from "react-bootstrap";
import { ProductThumbnail } from "../model/Product";
import { useNavigate } from "react-router-dom";
import { IMAGES_HOST } from "../../const/Util.ts";
import { formatPrice } from "../../util/Util.ts";
import StaticStar from "./StaticStar.tsx";

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
        src={IMAGES_HOST + data.thumbnailUrl}
        alt={`Image for ${data.name}`}
        style={{ height: "15rem" }}
      ></Card.Img>
      <Card.Body>
        <CardTitle>{data.name}</CardTitle>
        <CardText>
          <b>{formatPrice(data.salePrice)}</b> VND
        </CardText>
        <StaticStar score={data.avgRating}></StaticStar>
      </Card.Body>
      <Button onClick={handleClick} variant="dark" className="m-1">
        View details
      </Button>
    </Card>
  );
};

export default ProductCard;
