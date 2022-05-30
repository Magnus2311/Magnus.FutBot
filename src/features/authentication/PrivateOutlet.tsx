import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./authenticationService";

interface Props {
  path: string;
}

const PrivateOutlet = ({ path }: Props) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startAuthentication = async () => {
      const authed = await isAuthenticated();
      setAuthenticated(authed);
      setIsLoaded(true);
    };

    startAuthentication();
  });
  return isLoaded ? (
    authenticated ? (
      <Outlet />
    ) : (
      <Navigate to={`/auth/login?returnAfterLogin=${path}`} />
    )
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default PrivateOutlet;
