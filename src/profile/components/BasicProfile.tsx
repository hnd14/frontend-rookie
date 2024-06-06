import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import useSWR from "swr";
import { authFetcher } from "../../login/services/LoginService.ts";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { formatTime } from "../../util/Util.ts";
import ErrorPage from "../../components/ErrorPage.tsx";

const BasicProfile = () => {
  const { auth } = useContext(AuthContext);
  const { data, error, isLoading } = useSWR("/me", authFetcher, {
    shouldRetryOnError: auth.isAuthenticated,
  });
  if (error) return <ErrorPage error={error}></ErrorPage>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Form>
        <h1>{data.username}'s Profile</h1>
        <Form.Group>
          <Form.Label>
            <b>Username</b>
          </Form.Label>
          <Form.Control plaintext defaultValue={data.username}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Email</b>
          </Form.Label>
          <Form.Control plaintext defaultValue={data.email}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <b>Created at:</b>
            {" " + formatTime(data.createdTime)}
          </Form.Label>
        </Form.Group>

        <Form.Label>
          <b>Last modified at:</b>
          {" " + formatTime(data.updatedTime)}
        </Form.Label>
      </Form>
    </>
  );
};

export default BasicProfile;
