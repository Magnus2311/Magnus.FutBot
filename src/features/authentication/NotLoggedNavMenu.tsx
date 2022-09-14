import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "react-bootstrap";

const NotLoggedNavMenu = () => {
  return (
    <>
      <NavItem>
        <NavLink as={Link} className="text-dark" to="/auth/registration">
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink as={Link} className="text-dark" to="/auth/login">
          Login
        </NavLink>
      </NavItem>
    </>
  );
};

export default NotLoggedNavMenu;
