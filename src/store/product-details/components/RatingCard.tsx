import React from "react";
import { Card } from "react-bootstrap";
import StaticStar from "./StaticStar.tsx";
import { formatTime } from "../../../util/Util.ts";

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
      {data.comment ? (
        <Card.Body>
          <Card.Text>{data.comment}</Card.Text>
        </Card.Body>
      ) : (
        <></>
      )}
      <Card.Footer>
        <Card.Text>
          <i>{`${formatTime(data.updatedTime)}`}</i>
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default RatingCard;
