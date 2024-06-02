import React from "react";
import CategoriesList from "./components/CategoriesList.tsx";
import { Link } from "react-router-dom";
import PaginationLayout from "../../components/PaginationLayout.tsx";
import { adminFetcher } from "../services/AdminService.ts";

const CategoryPage = () => {
  return (
    <>
      <Link className="btn btn-dark m-1 " to="/admin/new-categories">
        Create new category
      </Link>
      <PaginationLayout
        fetcher={adminFetcher}
        url="/categories"
        displayer={CategoriesList}
        sortCriteria={[
          { label: "Name", value: "name" },
          { label: "Date created", value: "createdTime" },
          { label: "Last modified", value: "updatedTime" },
        ]}
      />
    </>
  );
};

export default CategoryPage;
