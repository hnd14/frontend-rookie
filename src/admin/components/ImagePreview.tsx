import React, { useState } from "react";
import { Card, CloseButton, Image, Modal } from "react-bootstrap";

const ImagePreview = ({ src, handleDelete }) => {
  const [opacity, setOpacity] = useState("100");
  const [showFull, setShowFull] = useState(false);
  return (
    <>
      <Card
        style={{ width: "5rem", height: "5rem" }}
        className="text-center m-2"
        onMouseEnter={() => {
          setOpacity("50");
        }}
        onMouseLeave={() => {
          setOpacity("100");
        }}
        onClick={() => {
          setShowFull(true);
        }}
      >
        <Card.Img
          variant="bottom"
          src={src}
          style={{ height: "5rem" }}
          className={`opacity-${opacity}`}
        />
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
      <Modal
        show={showFull}
        onHide={() => {
          setShowFull(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Image src={src}></Image>
      </Modal>
    </>
  );
};

export default ImagePreview;
