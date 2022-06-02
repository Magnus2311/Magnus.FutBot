import { ChangeEvent, FormEvent, useState } from "react";
import * as emailService from "../../services/emailsService";
import TextBox from "../common/TextBox";
import { useNavigate } from "react-router";
import * as usersService from "../authentication/authenticationService";
import { RegisterUserDTO } from "./models";
import Logo from "../common/Logo";
import { createSearchParams } from "react-router-dom";

enum RegistrationEnum {
  Email,
  Username,
  Password,
  ConfirmPassword,
}

const Registration = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "" && confirmPassword === "")
      setIsPasswordMatching(true);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) setIsPasswordMatching(true);
  };

  const changeIsRegisterActive = (field: RegistrationEnum) => {
    switch (field) {
      case RegistrationEnum.Email:
        const isEmail = emailService.isValidEmail(email) || email === "";
        setIsValidEmail(isEmail);
        setIsRegisterActive(
          !!email &&
            email !== "" &&
            isEmail &&
            !!password &&
            password !== "" &&
            isPasswordMatching &&
            isUsernameAvailable
        );
        break;
      case RegistrationEnum.Username:
        usersService
          .isUsernameAvailable(username)
          .then((isAvailable: boolean) => setIsUsernameAvailable(isAvailable));
        break;
      case RegistrationEnum.Password:
        setIsRegisterActive(
          !!password &&
            !!confirmPassword &&
            password === confirmPassword &&
            isValidEmail &&
            isUsernameAvailable
        );
        break;
      case RegistrationEnum.ConfirmPassword:
        setIsRegisterActive(
          !!confirmPassword &&
            !!password &&
            confirmPassword === password &&
            username !== "" &&
            isValidEmail &&
            isUsernameAvailable
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userToInsert = {
      password: password,
      username: username,
      email: email,
    } as RegisterUserDTO;
    usersService.add(userToInsert);
    navigate({
      pathname: "/auth/email-sent",
      search: createSearchParams({
        email: email,
      }).toString(),
    });
  };

  return (
    <>
      <Logo style={{ height: "64px", width: "64px" }} />
      <h3>Let's get started</h3>
      <h5>Sign up for free and get a lot of perks!</h5>
      <form onSubmit={handleSubmit} className="add-form">
        <TextBox
          handleChange={handleUsernameChange}
          value={username}
          label="Username"
          name="username"
          placeholder="Enter your username"
          type="text"
          autoFocus
          validation={{
            isValid: isUsernameAvailable,
            alertMessage: "This username is not available",
          }}
          handleBlur={() => changeIsRegisterActive(RegistrationEnum.Username)}
        />
        <TextBox
          handleChange={handleEmailChange}
          value={email}
          label="E-mail"
          name="email"
          placeholder="Enter your email"
          type="email"
          validation={{
            isValid: isValidEmail,
            alertMessage: "This is not a valid E-mail",
          }}
          handleBlur={() => changeIsRegisterActive(RegistrationEnum.Email)}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            columnGap: "0.75rem",
          }}
        >
          <TextBox
            handleChange={handlePasswordChange}
            value={password}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            handleBlur={() => changeIsRegisterActive(RegistrationEnum.Password)}
          />
          <TextBox
            handleChange={handleConfirmPasswordChange}
            value={confirmPassword}
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
            validation={{
              isValid: isPasswordMatching,
              alertMessage: "Passwords are different",
            }}
            handleBlur={() => {
              changeIsRegisterActive(RegistrationEnum.ConfirmPassword);
              setIsPasswordMatching(confirmPassword === password);
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-xl"
          style={{ width: "100%" }}
          disabled={!isRegisterActive}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Registration;
