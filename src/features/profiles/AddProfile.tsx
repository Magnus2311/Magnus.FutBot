import { FormEvent, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../common/Alert";
import { Button } from "../common/Button";
import TextBox from "../common/TextBox";
import {
  getProfileConnection,
  pendingAction,
  selectProfiles,
} from "./profileActions";

export const AddProfile = () => {
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("iavor.orlyov1@gmail.com");
  const [password, setPassword] = useState("A23112019a$");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const connection = await getProfileConnection(dispatch);

    if (connection) {
      connection.invoke("AddProfile", {
        email,
        password,
      });
      dispatch(pendingAction());
    }
  };

  const handleSendCode = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const connection = await getProfileConnection(dispatch);

    if (connection) {
      connection.invoke("SubmitCode", {
        email,
        code,
      });

      dispatch(pendingAction());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {profilesState.status === "wrong-credentials" && (
        <Alert content="Wrong credentials" type="danger" />
      )}
      {profilesState.status === "pending" && (
        <div style={{ width: "100%", display: "grid" }}>
          <Spinner
            animation="border"
            variant="primary"
            style={{ margin: "0 auto" }}
          />
        </div>
      )}
      {profilesState.status === "confirmation-key-required" && (
        <>
          <TextBox
            handleChange={(e) => setCode(e.target.value)}
            value={code}
            label="Confirmation code"
            name="code"
            placeholder="Enter confirmation code from your email"
            type="text"
          />
          <Button onClick={handleSendCode}>Send confirmation code</Button>
        </>
      )}
      {profilesState.status === "unknown-error" && (
        <Alert content="Unknown error occured!" type="danger" />
      )}
      {profilesState.status === "successfully-added" && (
        <Navigate to={"/profile/index"} />
      )}
      <TextBox
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        label="E-mail"
        name="email"
        placeholder="Enter your e-mail"
        type="text"
        autoFocus
      />
      <TextBox
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <Button disabled={profilesState.status === "pending"}>
        Add EA Profile
      </Button>
    </form>
  );
};
