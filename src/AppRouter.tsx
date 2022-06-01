import { Routes, Route } from "react-router-dom";
import About from "./features/About";
import EmailConfirmation from "./features/authentication/EmailConfirmation";
import EmailSent from "./features/authentication/EmailSent";
import AuthIndex from "./features/authentication/Index";
import Login from "./features/authentication/Login";
import PrivateOutlet from "./features/authentication/PrivateOutlet";
import Registration from "./features/authentication/Registration";
import ResetPassword from "./features/authentication/ResetPassword";
import Home from "./features/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/auth/registration" element={<Registration />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/index" element={<PrivateOutlet path="/auth/index" />}>
        <Route path="/auth/index" element={<AuthIndex />} />
      </Route>
      <Route
        path="/registration/email-confirmed"
        element={<EmailConfirmation />}
      />
      <Route path="/auth/email-sent/" element={<EmailSent />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRouter;
