import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import useSWR from "swr";
import { storeFetcher } from "../services/CustomerServices.ts";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage.tsx";
let category_id = null;
const SearchBar = () => {
  const [chosenCategory, setChosenCategory] = useState("Categories");
  const nav = useNavigate();
  const nameRef = useRef(document.createElement("input"));
  const params = {
    pageSize: 1000,
  };
  const { data, error, isLoading } = useSWR(
    ["/categories", params],
    ([url, params]) => storeFetcher(url, params)
  );
  if (error) return <ErrorPage error={error}></ErrorPage>;
  if (isLoading) return <h1>Loading</h1>;
  const handleSearch = () => {
    if (category_id) {
      nav(`/products?name=${nameRef.current.value}&category=${category_id}`);
    } else {
      nav(`/products?name=${nameRef.current.value}`);
    }
  };
  return (
    <Container>
      <h2>Search</h2>
      <Form>
        <InputGroup>
          <DropdownButton
            variant="outline-secondary"
            title={chosenCategory}
            align="end"
          >
            {data.content.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => {
                  category_id = category.id;
                  setChosenCategory(category.name);
                }}
              >
                {category.name}
              </Dropdown.Item>
            ))}
            <Dropdown.Item
              onClick={() => setChosenCategory("")}
            ></Dropdown.Item>
          </DropdownButton>
          <Form.Control type="text" ref={nameRef} />
          <Button variant="outline-secondary" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SearchBar;
