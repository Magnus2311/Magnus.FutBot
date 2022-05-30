import { Routes, Route } from "react-router-dom";
import About from "./features/About";
import AuthIndex from "./features/authentication/Index";
import Login from "./features/authentication/Login";
import Registration from "./features/authentication/Registration";
import Home from "./features/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/auth/registration" element={<Registration />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/index" element={<AuthIndex />} />
    </Routes>
  );
};

export default AppRouter;
