import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageUploadForm from "./components/ImageUploadForm.tsx";

const ImageUploadPage = () => {
  const { productId } = useParams();
  return (
    <Container>
      <h1>Upload Image</h1>
      <ImageUploadForm productId={productId} />
    </Container>
  );
};

export default ImageUploadPage;
