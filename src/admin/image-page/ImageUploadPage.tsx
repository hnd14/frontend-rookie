import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageUploadForm from "./components/ImageUploadForm.tsx";

const ImageUploadPage = () => {
  const { productId } = useParams();
  return (
    <Container>
      <ImageUploadForm productId={productId} next={"/admin/products"} />
    </Container>
  );
};

export default ImageUploadPage;
