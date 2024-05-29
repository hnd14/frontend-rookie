import React from "react";
import ProductTable from "./components/ProductTable.tsx";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <>
      <Link className="btn btn-dark m-1 " to="/admin/new-product">
        Create new product
      </Link>
      <ProductTable />
    </>
  );
};

export default ProductPage;
