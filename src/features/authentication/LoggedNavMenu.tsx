import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoggedNavMenu = () => {
  const { user } = useContext(AuthContext);

  return (
    user.username && (
      <Link to="/auth/index" className="text-dark nav-link">
        {user.username}
      </Link>
    )
  );
};

export default LoggedNavMenu;
