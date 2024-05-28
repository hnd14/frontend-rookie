import React from "react";
import { CategoryItem } from "../model/CategoryItem";

interface Props {
  category: CategoryItem;
}

const CategoryRow = ({ category }: Props) => {
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.desc}</td>
      <td>{category.createdBy}</td>
      <td>{category.createdTime}</td>
      <td>{category.updatedBy}</td>
      <td>{category.updatedTime}</td>
    </tr>
  );
};

export default CategoryRow;
