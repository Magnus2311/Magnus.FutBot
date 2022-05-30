import { Link } from "react-router-dom";

const NotLoggedNavMenu = () => {
  return (
    <>
      <Link
        className="nav-link"
        to="/auth/registration"
        style={{ marginRight: "1rem" }}
      >
        "Register"
      </Link>
      <Link className="nav-link" to="/auth/login">
        "Login"
      </Link>
    </>
  );
};

export default NotLoggedNavMenu;
