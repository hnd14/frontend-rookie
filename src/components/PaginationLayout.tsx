import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

interface Props {
  fetcher: any;
  url: string;
  sortCriteria: { label; value }[];
  displayer: ({ data, mutate }) => React.JSX.Element;
}

const PaginationLayout = ({
  fetcher,
  url,
  sortCriteria = [],
  displayer,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const params = {
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
    sortBy: searchParams.get("sortBy"),
    direction: searchParams.get("sortDirection"),
  };

  const { data, error, isLoading, mutate } = useSWR(
    [url, params],
    ([url, params]) => fetcher(url, params)
  );

  const RANDOM_KEY = Math.random().toString().slice(2, 20);
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
      <Row className="d-flex justify-content-end">
        <Col xs={3}>
          <Form.Label>
            <b>Page size</b>
          </Form.Label>
          <InputGroup>
            <Form.Select
              onChange={(e) => {
                setSearchParams((p) => {
                  p.set("pageSize", e.target.value);
                  return p;
                });
              }}
              defaultValue={searchParams.get("pageSize") || "10"}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </Form.Select>
            <InputGroup.Text>items/page</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={3}>
          <Form.Label>
            <b>Sort by</b>
          </Form.Label>
          <Form.Select
            defaultValue={searchParams.get("sortBy") || RANDOM_KEY}
            onChange={(e) => {
              setSearchParams((p) => {
                if (e.target.value != RANDOM_KEY) {
                  p.set("sortBy", e.target.value);
                } else {
                  p.delete("sortBy");
                }
                return p;
              });
            }}
          >
            <option value={RANDOM_KEY}></option>
            {sortCriteria.map((criteria) => {
              return <option value={criteria.value}>{criteria.label}</option>;
            })}
          </Form.Select>
        </Col>
        <Col xs={3}>
          <Form.Label>
            <b>Sort directions</b>
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              setSearchParams((p) => {
                p.set("sortDirection", e.target.value);
                return p;
              });
            }}
            defaultValue={searchParams.get("sortDirection") || "ASC"}
          >
            <option value={"ASC"}>Ascending</option>
            <option value={"DESC"}>Descending</option>
          </Form.Select>
        </Col>
      </Row>
      {displayer({ data, mutate })}
      <Container className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Container>
    </>
  );
};

export default PaginationLayout;
