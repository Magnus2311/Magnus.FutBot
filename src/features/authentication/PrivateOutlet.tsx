import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./authenticationService";

interface Props {
  path: string;
}

const PrivateOutlet = ({ path }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const startAuthentication = async () => {
      const authed = await isAuthenticated();
      setAuthenticated(authed);
      setIsLoaded(true);
    };

    startAuthentication();
  }, []);

  return isLoaded ? (
    authenticated ? (
      <Outlet />
    ) : (
      <Navigate to={`/auth/login?returnAfterLogin=${path}`} />
    )
  ) : (
    <CircularProgress color="primary" />
  );
};

export default PrivateOutlet;
