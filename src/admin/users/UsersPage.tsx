import React from "react";
import UsersTable from "./components/UsersTable.tsx";
import PaginationLayout from "../../components/PaginationLayout.tsx";
import { adminFetcher } from "../services/AdminService.ts";

const UsersPage = () => {
  return (
    <>
      <PaginationLayout
        fetcher={adminFetcher}
        url="/users"
        displayer={UsersTable}
      ></PaginationLayout>
    </>
  );
};

export default UsersPage;
