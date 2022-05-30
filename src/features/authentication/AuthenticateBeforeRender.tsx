import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "./Login";

interface Props {
  render: any;
}

const AuthenticateBeforeRender = ({ render }: Props) => {
  const { username, email } = useContext(AuthContext)?.user;

  return username || email ? render() : <Login returnAfterLogin={render()} />;
};

export default AuthenticateBeforeRender;
