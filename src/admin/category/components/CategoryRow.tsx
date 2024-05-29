import React, { useState } from "react";
import { CategoryItem } from "../model/CategoryItem";
import CategoryEditForm from "./CategoryEditForm.tsx";

interface Props {
  category: CategoryItem;
  handleDelete: (id: number) => void;
}

const CategoryRow = ({ category, handleDelete }: Props) => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <tr>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.desc}</td>
        <td>{category.createdBy}</td>
        <td>{category.createdTime}</td>
        <td>{category.updatedBy}</td>
        <td>{category.updatedTime}</td>
        <td>
          <button
            onClick={() => {
              setShowEdit(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(category.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
      <CategoryEditForm
        category={category}
        show={showEdit}
        handleClose={() => {
          setShowEdit(false);
        }}
      />
    </>
  );
};

export default CategoryRow;
