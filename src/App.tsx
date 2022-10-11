import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { AuthContext, User } from "./features/authentication/AuthContext";
import { initUser } from "./features/authentication/authenticationService";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { initRevisions } from "./helpers/images/revisions";
import { initClubLogos } from "./helpers/images/club-logos";
import { initLeagueLogos } from "./helpers/images/league-logos";
import { initPlayerFlags } from "./helpers/images/player-flags";
import { initPlayerImages } from "./helpers/images/player-images";

function App() {
  const [user, setUser] = useState<User>({
    username: undefined,
    email: undefined,
  });

  useEffect(() => {
    const getUserData = async () => {
      const userData = await initUser();
      setUser(userData);

      await initRevisions.logos();
      await initClubLogos.logos();
      await initLeagueLogos.logos();
      await initPlayerFlags.logos();
      await initPlayerImages.logos();
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
