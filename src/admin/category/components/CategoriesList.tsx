import React, { useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/AdminService.ts";
import useSWR from "swr";
import CategoryRow from "./CategoryRow.tsx";
import { Pagination } from "react-bootstrap";

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
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category name</th>
            <th>Category descriptions</th>
            <th>Created by</th>
            <th>Creation time</th>
            <th>Last modified by</th>
            <th>Last modified time</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((category) => (
            <CategoryRow category={category} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination>{items}</Pagination>
    </>
  );
};

export default CategoriesList;
