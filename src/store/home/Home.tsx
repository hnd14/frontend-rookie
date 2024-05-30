import React from "react";
import { Container } from "react-bootstrap";
import ProductCarousel from "../components/ProductCarousel.tsx";
import { storeFetcher } from "../services/CustomerServices.ts";
import useSWR from "swr";

const Home = () => {
  const { data, error, isLoading } = useSWR("/products", storeFetcher);
  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <h1>Welcome!</h1>
      <ProductCarousel data={data} />
    </>
  );
};

export default Home;
