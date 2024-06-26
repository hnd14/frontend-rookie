import React, { useState } from "react";
import { ProductItem } from "../model/ProductItem";
import { Container, FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp.tsx";
interface Props {
  product: ProductItem;
  handleDelete;
}
const ProductRow = ({ product, handleDelete }: Props) => {
  const nav = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const handleEdit = () => {
    nav(`/admin/products/${product.id}`);
  };
  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.desc}</td>
        <td>{product.salePrice}</td>
        <td>{product.stock}</td>
        <td>
          <Container fluid>
            <FormCheck disabled checked={product.isFeatured} />
          </Container>
        </td>
        <td>
          <button onClick={handleEdit}>Edit</button>
          <button
            onClick={() => {
              setShowPopUp(true);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
      <ConfirmationPopUp
        show={showPopUp}
        handleClose={() => {
          setShowPopUp(false);
        }}
        handleAccept={() => {
          handleDelete(product.id);
          setShowPopUp(false);
        }}
        title="Delete product"
      >
        {` Are you sure you want to delete ${product.name}?`}
      </ConfirmationPopUp>
    </>
  );
};

export default ProductRow;
