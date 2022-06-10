import { ChangeEvent, FormEvent, useContext, useState } from "react";
import * as emailsService from "../../services/emailsService";
import { AuthContext } from "./AuthContext";
import {
  login,
  resendConfirmationEmail,
  sendResetPasswordEmail,
} from "./authenticationService";
import { LoginUserDTO } from "./models";
import TextBox from "../common/TextBox";
import { useNavigate } from "react-router";
import Logo from "../common/Logo";
import { useSearchParams } from "react-router-dom";
import { Button } from "../common/Button";

interface Props {
  username?: string;
}

const emptyLogin = {
  password: "",
  username: "",
} as LoginUserDTO;

const Login = ({ username }: Props) => {
  const [searchParams] = useSearchParams();
  const returnAfterLogin = searchParams.get("returnAfterLogin");
  const [logged, setLogged] = useState(false);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [currentUser, setCurrentUser] = useState<LoginUserDTO>(
    username
      ? {
          username: username,
          email: "",
          password: "",
        }
      : emptyLogin
  );
  const { setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    changeIsLoginActive(e.target.name, e.target.value);
  };

  const changeIsLoginActive = (propName: string, propValue: string) => {
    switch (propName) {
      case "username":
        setIsLoginActive(
          !!propValue &&
            propValue !== "" &&
            currentUser &&
            !!currentUser.password
        );
        break;
      case "password":
        setIsLoginActive(!!propValue && propValue !== "");
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tempUser = currentUser;
    if (emailsService.isValidEmail(currentUser.username)) {
      tempUser.email = currentUser.username;
      tempUser.username = "";
    }

    login(tempUser).then((isLoginSuccessfulDTO) => {
      if (isLoginSuccessfulDTO) {
        setUser({
          username: isLoginSuccessfulDTO.username,
          email: isLoginSuccessfulDTO.email,
        });
        setLogged(true);
        navigate(returnAfterLogin ?? "/");
      } else {
        setIsWrongCredentials(true);
        setCurrentUser(emptyLogin);
        changeIsLoginActive("password", "");
      }
    });
  };

  const handleResetPassword = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const tempUser = currentUser;
    if (emailsService.isValidEmail(currentUser.username)) {
      tempUser.email = currentUser.username;
      tempUser.username = "";
    }
    sendResetPasswordEmail(currentUser.username, currentUser.email);
  };

  const handleResendConfirmationEmail = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const tempUser = currentUser;
    if (emailsService.isValidEmail(currentUser.username)) {
      tempUser.email = currentUser.username;
      tempUser.username = "";
    }
    resendConfirmationEmail(currentUser.username, currentUser.email);
  };

  return logged && returnAfterLogin ? (
    <>{navigate(returnAfterLogin)}</>
  ) : (
    <>
      <Logo style={{ height: "64px", width: "64px" }} />
      {username ? (
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
          type="text"
          name="username"
          placeholder="Enter your username or email"
          handleChange={handleChange}
          label="Username or E-mail"
          value={currentUser.username}
          autoFocus={!isWrongCredentials}
        />
        <TextBox
          type="password"
          name="password"
          placeholder="Enter your password"
          handleChange={handleChange}
          label="Password"
          value={currentUser.password}
          autoFocus={isWrongCredentials || !!username}
        />
        <Button disabled={!isLoginActive}>Login</Button>
        <button
          className="btn btn-secondary"
          disabled={
            !currentUser || !currentUser.username || currentUser.username === ""
          }
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={handleResetPassword}
        >
          Reset your password
        </button>
        <button
          className="btn btn-secondary"
          disabled={
            !currentUser || !currentUser.username || currentUser.username === ""
          }
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={handleResendConfirmationEmail}
        >
          Resend confirmation email
        </button>
      </form>
    </>
  );
};

export default Login;
