import { ChangeEvent, FormEvent, useState } from "react";
import * as emailService from "../../services/emailsService";
import TextBox from "../common/TextBox";
import { useNavigate } from "react-router";
import * as usersService from "../authentication/authenticationService";
import { RegisterUserDTO, SenderType } from "./models";
import { FUTBOT_WEB_ADDRESS } from "../../helpers/constants";
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
    changeIsRegisterActive(RegistrationEnum.Username, e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    changeIsRegisterActive(RegistrationEnum.Email, e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "" && confirmPassword === "")
      setIsPasswordMatching(true);
    changeIsRegisterActive(RegistrationEnum.Password, e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatching(e.target.value === password);
    changeIsRegisterActive(RegistrationEnum.ConfirmPassword, e.target.value);
  };

  const changeIsRegisterActive = (
    field: RegistrationEnum,
    propValue: string
  ) => {
    switch (field) {
      case RegistrationEnum.Email:
        const isEmail = emailService.isValidEmail(propValue);
        setIsValidEmail(isEmail);
        setIsRegisterActive(
          !!propValue &&
            propValue !== "" &&
            isEmail &&
            !!password &&
            password !== "" &&
            isPasswordMatching &&
            isUsernameAvailable
        );
        break;
      case RegistrationEnum.Username:
        usersService
          .isUsernameAvailable(propValue)
          .then((isAvailable: boolean) => setIsUsernameAvailable(isAvailable));
        break;
      case RegistrationEnum.Password:
        setIsRegisterActive(
          !!propValue &&
            !!confirmPassword &&
            propValue === confirmPassword &&
            isValidEmail &&
            isUsernameAvailable
        );
        break;
      case RegistrationEnum.ConfirmPassword:
        setIsRegisterActive(
          !!propValue &&
            !!password &&
            propValue === password &&
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
      callbackUrl: `${FUTBOT_WEB_ADDRESS}/registration/email-confirmed`,
      senderType: SenderType.Futbot,
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
          isValid={isUsernameAvailable}
        />
        <TextBox
          handleChange={handleEmailChange}
          value={email}
          label="E-mail"
          name="email"
          placeholder="Enter your email"
          type="email"
          autoFocus
          isValid={isValidEmail}
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
          />
          <TextBox
            handleChange={handleConfirmPasswordChange}
            value={confirmPassword}
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
            isValid={isPasswordMatching}
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
