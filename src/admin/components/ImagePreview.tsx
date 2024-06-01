import React from "react";
import { Card, CloseButton } from "react-bootstrap";

const ImagePreview = ({ src, handleDelete }) => {
  return (
    <Card style={{ width: "5rem", height: "5rem" }} className="text-center m-2">
      <Card.Img variant="bottom" src={src} style={{ height: "5re  m" }} />
      <Card.ImgOverlay>
        <Card.Body>
          <CloseButton
            style={{
              position: "absolute",
              height: "0.25rem",
              top: "0.25rem",
              right: "0.25rem",
            }}
            onClick={handleDelete}
          ></CloseButton>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};

export default ImagePreview;
