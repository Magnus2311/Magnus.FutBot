import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router";
import TextBox from "../common/TextBox";
import { AuthContext } from "./AuthContext";
import { changePassword, logout } from "./authenticationService";

const AuthIndex = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isPasswordChangedSuccessfully, setIsPasswordChanged] = useState<
    boolean | undefined
  >(undefined);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSumbitChangePasswordActive, setIsSumbitChangePasswordActive] =
    useState(false);
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
  const navigate = useNavigate();

  const handleChangePasswordClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsChangePasswordActive(!isChangePasswordActive);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setIsSumbitChangePasswordActive(
      e.target.value !== "" &&
        e.target.value === confirmNewPassword &&
        oldPassword !== ""
    );
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
    setIsSumbitChangePasswordActive(
      e.target.value !== "" &&
        e.target.value === newPassword &&
        oldPassword !== ""
    );
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    setIsSumbitChangePasswordActive(
      e.target.value !== "" &&
        newPassword !== "" &&
        newPassword === confirmNewPassword
    );
  };

  const handleSubmitChangePassword = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changePassword(oldPassword, newPassword).then((changePasswordResponse) => {
      if (changePasswordResponse.isChangeSuccessful) {
        setIsChangePasswordActive(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsSumbitChangePasswordActive(false);
        setIsPasswordChanged(true);
      } else {
        setIsPasswordChanged(false);
      }
    });
  };

  const handleSignOutClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout().then(() => {
      setUser({ username: undefined, email: undefined });
    });
    navigate("/");
  };

  return (
    <>
      <h4>Basic settings for account</h4>
      <hr />
      {isPasswordChangedSuccessfully !== undefined &&
        (isPasswordChangedSuccessfully ? (
          <div className="alert alert-success" role="alert">
            Password was changed successfully
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            Could not change password! Try again.
          </div>
        ))}
      <form className="add-form">
        {user && user.username && (
          <TextBox
            label="Username"
            value={user.username.toLowerCase()}
            disabled
            handleChange={() => {}}
            name="Username"
            placeholder="Username"
          />
        )}
        {user && user.email && (
          <TextBox
            label="E-mail"
            value={user.email.toLowerCase()}
            disabled
            handleChange={() => {}}
            name="Email"
            placeholder="Email"
          />
        )}
        <div
          className={`expandable ${
            isChangePasswordActive ? "expanded" : "collapsed"
          }`}
          style={{
            maxHeight: isChangePasswordActive ? "400px" : "38px",
            borderRadius: "7px",
            border: "solid 0.2rem rgb(38 143 255 / 50%)",
            borderWidth: isChangePasswordActive ? "0.2rem" : "0rem",
            marginBottom: "1rem",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={handleChangePasswordClick}
            style={{ width: "100.2%", marginLeft: "-0.3px" }}
          >
            Change password
          </button>
          <div
            className="fadeable"
            style={{
              opacity: isChangePasswordActive ? "1" : "0",
              visibility: isChangePasswordActive ? "visible" : "collapse",
              padding: "1rem",
            }}
          >
            <TextBox
              type="password"
              name="oldPassword"
              placeholder="Enter your old password"
              handleChange={handleOldPasswordChange}
              label="Old Password"
              value={oldPassword}
            />
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
              onClick={handleSubmitChangePassword}
              className="btn btn-primary"
              disabled={!isSumbitChangePasswordActive}
              style={{
                width: "100%",
              }}
            >
              Submit new password
            </button>
          </div>
        </div>
      </form>
      <button onClick={handleSignOutClick} className="btn btn-primary">
        Sign out
      </button>
    </>
  );
};

export default AuthIndex;
