import React from "react";
import UsersTable from "./components/UsersTable.tsx";
import PaginationLayout from "../../components/PaginationLayout.tsx";
import { adminFetcher } from "../services/AdminService.ts";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const nav = useNavigate();
  return (
    <>
      <Button
        className="m-1"
        variant="dark"
        onClick={() => {
          nav("/admin/new");
        }}
      >
        Create new admin
      </Button>
      <PaginationLayout
        fetcher={adminFetcher}
        url="/users"
        displayer={UsersTable}
        sortCriteria={[
          { label: "Username", value: "username" },
          { label: "Date created", value: "createdTime" },
          { label: "Last modified", value: "updatedTime" },
        ]}
      ></PaginationLayout>
    </>
  );
};

export default UsersPage;
