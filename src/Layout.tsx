import { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserNavMenu from "./features/authentication/UserNavMenu";
import Logo from "./features/common/Logo";

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ minWidth: "380px", height: "50px" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo style={{ marginLeft: "10px" }} />
            <Typography variant="h6" sx={{ paddingLeft: "10px" }}>
              Magnus Fut Bot
            </Typography>
          </div>
        </Link>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ marginLeft: "auto" }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/profile/index"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Profiles
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/players"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Players
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/cards/buy"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Buy
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/cards/buy-and-sell"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Buy & Sell
            </Link>
          </MenuItem>
        </Menu>
        <UserNavMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Layout;
