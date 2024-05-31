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
const ProductSearchLayout = ({ fetcher, displayer }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameRef = useRef(document.createElement("input"));
  const minPriceRef = useRef(document.createElement("input"));
  const maxPriceRef = useRef(document.createElement("input"));
  const params = {
    name: searchParams.get("name"),
    categoriesId: searchParams.get("category"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
  };
  const { data, error, isLoading } = useSWR(
    ["/products", params],
    ([url, params]) => fetcher(url, params)
  );
  const [pageNumber, setPageNumber] = useState(1);
  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      Number(minPriceRef.current.value) >= Number(maxPriceRef.current.value) &&
      maxPriceRef.current.value !== ""
    ) {
      alert("Min price must be smaller than max price");
    } else {
      const newSearchParams = {
        name: nameRef.current.value,
        minPrice:
          Number(minPriceRef.current.value) > 0
            ? minPriceRef.current.value.toString() + "000"
            : "",
        maxPrice:
          Number(maxPriceRef.current.value) > 0
            ? maxPriceRef.current.value.toString() + "000"
            : "",
      };
      setSearchParams(newSearchParams);
    }
  };

  // create paginations
  let items: React.JSX.Element[] = [];
  for (let number = 1; number <= data.pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pageNumber}
        onClick={() => setPageNumber(number)}
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
              <Form.Control type="text" ref={nameRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <InputGroup>
                <Form.Control type="number" ref={minPriceRef} />
                <InputGroup.Text>000</InputGroup.Text>
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <InputGroup>
                <Form.Control type="number" ref={maxPriceRef} />
                <InputGroup.Text>000</InputGroup.Text>
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="dark" className="m-1">
              Search
            </Button>
          </Form>
        </Container>
      </Col>

      <Col xs={9}>
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
        <Row>{displayer({ data })}</Row>
        <Container className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </Container>
      </Col>
    </Row>
  );
};

export default ProductSearchLayout;
