import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "./authenticationService";
import TextBox from "../common/TextBox";
import Login from "./Login";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [email] = useState(searchParams.get("email") ?? undefined);
  const [token] = useState(searchParams.get("token") ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSumbitChangePasswordActive, setIsSumbitChangePasswordActive] =
    useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmitChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(token, newPassword).then(isSuccessful => {
      if (isSuccessful) {
        setIsPasswordChanged(isSuccessful);
      }
    });
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setIsSumbitChangePasswordActive(
      e.target.value !== "" && e.target.value === confirmNewPassword
    );
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
    setIsSumbitChangePasswordActive(
      e.target.value !== "" && e.target.value === newPassword
    );
  };

  let content;

  if (isPasswordChanged) {
    content = <Login username={email} />;
  } else {
    content = (
      <form className="add-form" onSubmit={handleSubmitChangePassword}>
        <TextBox
          type="password"
          name="newPassword"
          placeholder="Enter your new password"
          handleChange={handleNewPasswordChange}
          label="New Password"
          value={newPassword}
        />
        <TextBox
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm password"
          handleChange={handleConfirmNewPasswordChange}
          label="Confirm password"
          value={confirmNewPassword}
        />
        <button
          className="btn btn-primary"
          style={{
            width: "100%",
          }}
          disabled={!isSumbitChangePasswordActive}
        >
          Reset password
        </button>
      </form>
    );
  }
  return content;
};

export default ResetPassword;
