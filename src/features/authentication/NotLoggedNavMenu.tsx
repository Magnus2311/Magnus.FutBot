import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, ListItemText } from "@mui/material";

const NotLoggedNavMenu = () => {
  return (
    <>
      <MenuItem component={Link} to="/auth/registration">
        <ListItemText primary="Register" />
      </MenuItem>
      <MenuItem component={Link} to="/auth/login">
        <ListItemText primary="Login" />
      </MenuItem>
    </>
  );
};

export default NotLoggedNavMenu;
