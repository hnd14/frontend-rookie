import React from "react";
import { deleteCategory } from "../../services/AdminService.ts";
import CategoryRow from "./CategoryRow.tsx";
import { Table } from "react-bootstrap";

const CategoriesList = ({ data, mutate }) => {
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
    </>
  );
};

export default CategoriesList;
