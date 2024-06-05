import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import ErrorPage from "./ErrorPage.tsx";

interface Props {
  fetcher: any;
  sortCriteria: { label; value }[];
  displayer: ({ data, mutate }) => React.JSX.Element;
}

const ProductSearchLayout = ({
  fetcher,
  sortCriteria = [],
  displayer,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameRef = useRef(document.createElement("input"));
  const minPriceRef = useRef(document.createElement("input"));
  const maxPriceRef = useRef(document.createElement("input"));
  const categoryRef = useRef(document.createElement("select"));
  const params = {
    name: searchParams.get("name"),
    categoriesId: searchParams.get("category"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
    sortBy: searchParams.get("sortBy"),
    direction: searchParams.get("sortDirection"),
  };
  const { data, error, isLoading, mutate } = useSWR(
    ["/products", params],
    ([url, params]) => fetcher(url, params),
    { suspense: true }
  );
  const {
    data: cateData,
    error: cateError,
    isLoading: cateLoading,
  } = useSWR(
    ["/categories", { pageSize: 1000 }],
    ([url, params]) => fetcher(url, params),
    { suspense: true }
  );
  const [pageNumber, setPageNumber] = useState(1);
  const RANDOM_KEY = Math.random().toString().slice(2, 20);
  if (error || cateError)
    return <ErrorPage error={error || cateError}></ErrorPage>;
  if (isLoading || cateLoading) return <h1>Loading...</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      Number(minPriceRef.current.value) >= Number(maxPriceRef.current.value) &&
      maxPriceRef.current.value !== ""
    ) {
      alert("Min price must be smaller than max price");
    } else {
      setSearchParams((p) => {
        p.set(
          "minPrice",
          Number(minPriceRef.current.value) > 0
            ? minPriceRef.current.value.toString() + "000"
            : ""
        );
        p.set(
          "maxPrice",
          Number(maxPriceRef.current.value) > 0
            ? maxPriceRef.current.value.toString() + "000"
            : ""
        );
        p.set("name", nameRef.current.value);
        if (categoryRef.current.value != "0") {
          p.set("category", categoryRef.current.value);
        } else {
          p.delete("category");
        }
        return p;
      });
    }
  };

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
    <Row>
      <Col>
        <Container>
          <h2>Advanced Search</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                defaultValue={searchParams.get("name") || ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  ref={minPriceRef}
                  defaultValue={
                    searchParams.get("minPrice")?.slice(0, -3) || ""
                  }
                />
                <InputGroup.Text>000</InputGroup.Text>
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                ref={categoryRef}
                defaultValue={
                  params.categoriesId ? Number(params.categoriesId) : 0
                }
              >
                <option value={0}></option>
                {cateData.content.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  ref={maxPriceRef}
                  defaultValue={
                    searchParams.get("maxPrice")?.slice(0, -3) || ""
                  }
                />
                <InputGroup.Text>000</InputGroup.Text>
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="dark" className="m-1">
              Search
            </Button>
            <Button
              variant="dark"
              className="m-1"
              onClick={() => {
                setSearchParams((p) => {
                  p.delete("name");
                  p.delete("category");
                  p.delete("minPrice");
                  p.delete("maxPrice");
                  return p;
                });
              }}
            >
              Reset
            </Button>
          </Form>
        </Container>
      </Col>

      <Col xs={9}>
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
        <Row>{displayer({ data, mutate })}</Row>
        <Container className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </Container>
      </Col>
    </Row>
  );
};

export default ProductSearchLayout;
