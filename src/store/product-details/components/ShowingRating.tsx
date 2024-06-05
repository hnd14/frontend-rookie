import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { storeFetcher } from "../../services/CustomerServices.ts";
import useSWR from "swr";
import { Container, Form, Pagination } from "react-bootstrap";
import RatingCard from "./RatingCard.tsx";
import ErrorPage from "../../../components/ErrorPage.tsx";

const ShowingRating = ({ productId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const params = {
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
  };

  const { data, error, isLoading } = useSWR(
    [`/products/${productId}/ratings`, params],
    ([url, params]) => storeFetcher(url, params)
  );
  if (error) return <ErrorPage error={error}></ErrorPage>;
  if (isLoading) return <h1>Loading...</h1>;
  // create paginations
  let items: React.JSX.Element[] = [];
  for (let number = 1; number <= data.pageCount; number++) {
    items.push(
      <Pagination.Item
        linkStyle={{
          background: "black",
          color: "white",
          borderColor: "black",
        }}
        key={number}
        active={number === pageNumber}
        onClick={() => {
          setSearchParams((p) => {
            p.set("pageNumber", number.toString());
            setPageNumber(number);
            return p;
          });
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Form.Select
        onChange={(e) => {
          setSearchParams((p) => {
            p.set("pageSize", e.target.value);
            return p;
          });
        }}
        defaultValue={searchParams.get("pageSize") || "10"}
      >
        <option value={5}>5 comments/page</option>
        <option value={10}>10 comments/page</option>
        <option value={20}>20 comments/page</option>
      </Form.Select>
      {data.content.map((rating) => (
        <RatingCard data={rating} />
      ))}
      <Container className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default ShowingRating;
