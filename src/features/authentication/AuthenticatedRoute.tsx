import { FunctionComponent, useEffect, useState } from "react";
import { Route } from "react-router";
import AuthenticateBeforeRender from "./AuthenticateBeforeRender";
import { isAuthenticated } from "./authenticationService";

interface AuthenticatedProps {
  Component: any;
  path: string;
  props: any;
}

export const AuthenticatedRoute: FunctionComponent<AuthenticatedProps> = ({
  Component,
  path,
  props,
}) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const startAuthentication = async () => {
      setAuthenticated(await isAuthenticated());
    };

    startAuthentication();
  });

  return (
    <Route path={path}>
      {authenticated ? (
        <Component {...props} />
      ) : (
        <AuthenticateBeforeRender render={() => <Component {...props} />} />
      )}
    </Route>
  );
};
