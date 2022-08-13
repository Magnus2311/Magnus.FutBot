import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { AuthContext, User } from "./features/authentication/AuthContext";
import { initUser } from "./features/authentication/authenticationService";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState<User>({
    username: undefined,
    email: undefined,
  });

  useEffect(() => {
    const getUserData = async () => {
      const userData = await initUser();
      setUser(userData);
    };
    getUserData();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <ToastContainer />
      <Layout />
      <div className="container App-container">
        <AppRouter />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
