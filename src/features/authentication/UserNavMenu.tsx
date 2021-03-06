import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoggedNavMenu from "./LoggedNavMenu";
import NotLoggedNavMenu from "./NotLoggedNavMenu";

const UserNavMenu = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="mr-auto navbar-nav"
      style={{ position: "fixed", right: "4rem" }}
    >
      <div className="dropdown nav-item" style={{ display: "inline-flex" }}>
        {user.username ? <LoggedNavMenu /> : <NotLoggedNavMenu />}
      </div>
    </div>
  );
};

export default UserNavMenu;
