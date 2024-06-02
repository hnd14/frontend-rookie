import React from "react";
import { formatTime } from "../../../util/Util.ts";

const UsersRow = ({ data }) => {
  return (
    <tr>
      <td>{data.username}</td>
      <td>{data.email}</td>
      <td>{formatTime(data.createdTime)}</td>
      <td>{formatTime(data.updatedTime)}</td>
      <td>{data.roles.join(", ")}</td>
    </tr>
  );
};

export default UsersRow;
