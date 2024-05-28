import React from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/AdminService.ts";
import useSWR from "swr";
import CategoryRow from "./CategoryRow.tsx";

const CategoriesList = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/categories",
    getAllCategories
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
  console.log(data?.data);

  return (
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
        {data?.data.content.map((category) => (
          <CategoryRow category={category} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesList;
