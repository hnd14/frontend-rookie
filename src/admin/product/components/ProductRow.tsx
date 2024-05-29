import React from "react";
import { ProductItem } from "../model/ProductItem";
import { Container, FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface Props {
  product: ProductItem;
  handleDelete;
}
const ProductRow = ({ product, handleDelete }: Props) => {
  const nav = useNavigate();
  const handleEdit = () => {
    nav(`/admin/products/${product.id}`);
  };
  return (
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
            handleDelete(product.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
