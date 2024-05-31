import React from "react";
import { Table } from "react-bootstrap";
import { deleteProduct } from "../../services/AdminService.ts";
import ProductRow from "./ProductRow.tsx";

const ProductTable = ({ data, mutate }) => {
  // handle delete item
  const handleDelete = (id: number) => {
    deleteProduct(id)
      .then(() => {
        alert("Delete product successfully");
        mutate();
      })
      .catch(() => {
        alert("Failed to delete product!");
      });
  };

  return (
    <>
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((pro) => (
            <ProductRow product={pro} handleDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductTable;
