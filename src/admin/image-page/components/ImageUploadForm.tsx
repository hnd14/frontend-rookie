import React from "react";
import { Button, Form } from "react-bootstrap";
import { postThumbnailAndImages } from "../../services/AdminService.ts";

const ImageUploadForm = ({ productId }) => {
  const handlieSubmit = (event) => {
    event.preventDefault();
    postThumbnailAndImages(new FormData(event.target)).then(() => {
      alert("Image upload successfully");
    });
  };
  return (
    <Form onSubmit={handlieSubmit}>
      <Form.Control
        type="number"
        className="d-none"
        value={productId}
        name="productId"
      />
      <Form.Group>
        <Form.Label>Thumbnail</Form.Label>
        <Form.Control type="file" name="thumbnail" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" name="file" multiple />
      </Form.Group>
      <Button type="submit">Upload Images</Button>
    </Form>
  );
};

export default ImageUploadForm;
