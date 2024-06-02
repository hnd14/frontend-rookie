import React, { useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/AdminService.ts";
import useSWR from "swr";
import CategoryRow from "./CategoryRow.tsx";
import { Container, Pagination, Table } from "react-bootstrap";

const CategoriesList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, error, isLoading, mutate } = useSWR(
    ["/categories", pageNumber],
    ([url, arg]) => getAllCategories(arg)
  );
  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        alert("Delete category successfully");
        mutate();
      })
      .catch(() => {
        alert("Failed to delete category");
      });
  };

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  let items: React.JSX.Element[] = [];
  for (let number = 1; number <= data.pageCount; number++) {
    items.push(
      <Pagination.Item
        linkStyle={{
          background: "black",
          color: "white",
          borderColor: "black",
        }}
        key={number}
        active={number === pageNumber}
        onClick={() => setPageNumber(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>Category name</th>
            <th>Category descriptions</th>
            <th>Created by</th>
            <th>Creation time</th>
            <th>Last modified by</th>
            <th>Last modified time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((category) => (
            <CategoryRow category={category} handleDelete={handleDelete} />
          ))}
        </tbody>
      </Table>
      <Container className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default CategoriesList;
