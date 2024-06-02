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
        sortCriteria={[
          { label: "Product name", value: "name" },
          { label: "Date created", value: "createdTime" },
          { label: "Last modified", value: "updatedTime" },
          { label: "Price", value: "salePrice" },
          { label: "Stock", value: "stock" },
        ]}
      />
    </>
  );
};

export default ProductPageV2;
