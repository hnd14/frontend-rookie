import React, { useState } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import useSWR from "swr";
import { deleteProduct, getAllProducts } from "../../services/AdminService.ts";
import ProductRow from "./ProductRow.tsx";
import ErrorPage from "../../../components/ErrorPage.tsx";

const ProductTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    ["/products", pageNumber],
    ([url, arg]) => getAllProducts(arg)
  );
  if (error) return <ErrorPage error={error}></ErrorPage>;
  if (isLoading) return <h1>Loading...</h1>;

  // create paginations
  let items: React.JSX.Element[] = [];
  for (let number = 1; number <= data.pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pageNumber}
        onClick={() => setPageNumber(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

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
      <Container className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default ProductTable;
