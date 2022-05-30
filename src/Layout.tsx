import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserNavMenu from "./features/authentication/UserNavMenu";

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
      }}
      expanded={isExpanded}
    >
      <Link className="navbar-brand" to="/" onClick={handleClick}>
        <img
          src="/images/logos/logo_transparent_no_text.png"
          alt="Life Mode logo"
          style={{ height: "30px", width: "30px", paddingBottom: "5px" }}
        />
        Magnus Fut Bot
      </Link>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ position: "fixed", left: "10rem", top: "0.5rem" }}
        onClick={handleOpenning}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/about" onClick={handleClick}>
            About
          </Link>
        </Nav>
      </Navbar.Collapse>
      <UserNavMenu />
    </Navbar>
  );
};

export default Layout;
