import React from "react";
import { Table } from "react-bootstrap";
import UsersRow from "./UsersRow.tsx";

const UsersTable = ({ data, mutate }) => {
  return (
    <Table variant="dark" striped bordered hover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Date created</th>
          <th>Last modified at</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        {data.content.map((user) => (
          <UsersRow data={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
