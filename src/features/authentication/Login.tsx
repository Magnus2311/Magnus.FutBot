import { ChangeEvent, FormEvent, useContext, useState } from "react";
import * as emailsService from "../../services/emailsService";
import { AuthContext } from "./AuthContext";
import { login, sendResetPasswordEmail } from "./authenticationService";
import { LoginUserDTO } from "./models";
import TextBox from "../common/TextBox";

interface Props {
  returnAfterLogin?: any;
  username?: string;
  isConfirmation?: boolean;
}

const emptyLogin = {
  password: "",
  username: "",
} as LoginUserDTO;

const Login = ({ returnAfterLogin, username, isConfirmation }: Props) => {
  const [logged, setLogged] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [currentUser, setCurrentUser] = useState<LoginUserDTO>(emptyLogin);
  const { setUser } = useContext(AuthContext)!;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    login(currentUser).then((isLoginSuccessful) => {
      if (isLoginSuccessful) {
        setUser(currentUser);
        setLogged(true);
      } else {
        setIsWrongCredentials(true);
        setCurrentUser(emptyLogin);
        changeIsLoginActive("password", "");
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    changeIsLoginActive(e.target.name, e.target.value);
  };

  const changeIsLoginActive = (propName: string, propValue: string) => {
    switch (propName) {
      case "username":
        const isEmail = emailsService.isValidEmail(propValue);
        setIsValidEmail(isEmail);
        setIsLoginActive(
          !!propValue &&
            propValue !== "" &&
            isEmail &&
            currentUser &&
            !!currentUser.password
        );
        break;
      case "password":
        setIsLoginActive(!!propValue && propValue !== "" && isValidEmail);
        break;
      default:
        break;
    }
  };

  const handleResetPassword = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendResetPasswordEmail(currentUser.username);
  };

  return logged && returnAfterLogin ? (
    returnAfterLogin
  ) : (
    <>
      <img
        alt="Life Mode logo"
        src="/images/logos/logo_transparent.png"
        style={{ height: "20rem", width: "20rem", alignSelf: "baseline" }}
      />
      {isConfirmation ? (
        <h5 style={{ color: "#97db48" }}>Email confirmed successfully!</h5>
      ) : (
        <>
          <h3>Welcome back</h3>
          <h5>Login and continue to enjoy our site</h5>
        </>
      )}

      {isWrongCredentials && (
        <h6 style={{ color: "red" }}>E-mail or password are wrong!</h6>
      )}
      <form onSubmit={handleSubmit} className="add-form">
        <TextBox
          type="email"
          name="email"
          placeholder="Enter your username or email"
          handleChange={handleChange}
          label="E-mail"
          value={currentUser.username}
          autoFocus={!isWrongCredentials && !isConfirmation}
        />
        <TextBox
          type="password"
          name="password"
          placeholder="Enter your password"
          handleChange={handleChange}
          label="Password"
          value={currentUser.password}
          autoFocus={isWrongCredentials || isConfirmation || !!username}
        />
        <button
          className="btn btn-primary btn-xl"
          style={{ width: "100%" }}
          disabled={!isLoginActive}
        >
          Login
        </button>
        <button
          className="btn btn-secondary"
          disabled={
            !currentUser ||
            !currentUser.username ||
            currentUser.username === "" ||
            !isValidEmail
          }
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={handleResetPassword}
        >
          Reset your password
        </button>
      </form>
    </>
  );
};

export default Login;
