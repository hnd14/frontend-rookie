import React from "react";
import ProductCarousel from "../components/ProductCarousel.tsx";
import { storeFetcher } from "../services/CustomerServices.ts";
import useSWR from "swr";
import SearchBar from "../components/SearchBar.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";

const Home = () => {
  const featuredParams = {
    pageSize: 20,
    pageNumber: 1,
    isFeatured: true,
  };
  const {
    data: featuredData,
    error,
    isLoading,
  } = useSWR(["/products", featuredParams], ([url, params]) =>
    storeFetcher(url, params)
  );

  if (error) return <ErrorPage error={error}></ErrorPage>;
  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <SearchBar />
      <ProductCarousel title="Featured product" data={featuredData.content} />
    </>
  );
};

export default Home;
