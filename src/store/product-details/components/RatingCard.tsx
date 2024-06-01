import React from "react";
import { Card } from "react-bootstrap";
import StaticStar from "./StaticStar.tsx";

const RatingCard = ({ data }) => {
  return (
    <Card className="m-1">
      <Card.Header>
        <Card.Text>
          <b>{data.username}</b>
          {"  "}
          <StaticStar score={data.scores} size="h5" />
        </Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Text>{data.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RatingCard;
