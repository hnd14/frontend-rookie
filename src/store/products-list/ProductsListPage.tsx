import React from "react";
import ProductSearchLayout from "../../components/ProductSearchLayout.tsx";
import { storeFetcher } from "../services/CustomerServices.ts";
import ProductCard from "../components/ProductCard.tsx";

const ProductPageTest = () => {
  return (
    <>
      <ProductSearchLayout
        fetcher={storeFetcher}
        displayer={({ data }) => {
          return data.content.map((product) => <ProductCard data={product} />);
        }}
        sortCriteria={[
          { label: "Product name", value: "name" },
          { label: "Price", value: "salePrice" },
        ]}
      />
    </>
  );
};

export default ProductPageTest;
