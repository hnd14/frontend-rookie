import React from "react";
import { ProductItem } from "../model/ProductItem";
interface Props {
  product: ProductItem;
  handleDelete;
}
const ProductRow = ({ product, handleDelete }: Props) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.desc}</td>
      <td>{product.salePrice}</td>
      <td>{product.isFeatured}</td>
      <td>{product.stock}</td>
      <td>
        <button>Edit</button>
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
