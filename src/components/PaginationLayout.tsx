import React, { useState } from "react";
import { Container, Form, Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

interface Props {
  fetcher: any;
  url: string;
  displayer: ({ data, mutate }) => React.JSX.Element;
}

const PaginationLayout = ({ fetcher, url, displayer }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const params = {
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
  };

  const { data, error, isLoading, mutate } = useSWR(
    [url, params],
    ([url, params]) => fetcher(url, params)
  );
  if (error) return <h1>Error</h1>;
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
        <option value={5}>5 items/page</option>
        <option value={10}>10 items/page</option>
        <option value={20}>20 items/page</option>
      </Form.Select>
      {displayer({ data, mutate })}
      <Container className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default PaginationLayout;
