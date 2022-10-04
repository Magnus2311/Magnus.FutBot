import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserNavMenu from "./features/authentication/UserNavMenu";
import Logo from "./features/common/Logo";

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    if (isExpanded) setIsExpanded(!isExpanded);
  };

  const handleOpenning = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        minWidth: "380px",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "50px",
      }}
      expanded={isExpanded}
    >
      <Link className="navbar-brand" to="/" onClick={handleClick}>
        <div style={{ display: "flex", placeItems: "center" }}>
          <Logo style={{ marginLeft: "10px" }} />
          <p style={{ paddingLeft: "10px", margin: "0 auto" }}>
            Magnus Fut Bot
          </p>
        </div>
      </Link>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ position: "fixed", left: "10rem", top: "0.5rem" }}
        onClick={handleOpenning}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/profile/index" onClick={handleClick}>
            Profiles
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/players" onClick={handleClick}>
            Players
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/cards/buy" onClick={handleClick}>
            Buy
          </Link>
        </Nav>
        <Nav className="mr-auto">
          <Link
            className="nav-link"
            to="/cards/buy-and-sell"
            onClick={handleClick}
          >
            Buy & Sell
          </Link>
        </Nav>
      </Navbar.Collapse>
      <UserNavMenu />
    </Navbar>
  );
};

export default Layout;
