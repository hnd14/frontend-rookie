import React from "react";
import CategoriesList from "./components/CategoriesList.tsx";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  return (
    <>
      <Link className="btn btn-dark m-1 " to="/admin/new-categories">
        Create new category
      </Link>
      <CategoriesList />
    </>
  );
};

export default CategoryPage;
