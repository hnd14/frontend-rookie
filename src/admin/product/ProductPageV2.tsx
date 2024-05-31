import React from "react";
import ProductSearchLayout from "../../components/ProductSearchLayout.tsx";
import { adminFetcher } from "../services/AdminService.ts";
import ProductTable from "./components/ProductTableV2.tsx";
import { Link } from "react-router-dom";

const ProductPageV2 = () => {
  return (
    <>
      <Link className="btn btn-dark m-1 " to="/admin/new-product">
        Create new product
      </Link>
      <ProductSearchLayout
        fetcher={adminFetcher}
        displayer={({ data, mutate }) => (
          <ProductTable data={data} mutate={mutate} />
        )}
      />
    </>
  );
};

export default ProductPageV2;
