import { Routes, Route } from "react-router-dom";
import About from "./features/About";
import EmailConfirmation from "./features/authentication/EmailConfirmation";
import EmailSent from "./features/authentication/EmailSent";
import AuthIndex from "./features/authentication/Index";
import Login from "./features/authentication/Login";
import PrivateOutlet from "./features/authentication/PrivateOutlet";
import Registration from "./features/authentication/Registration";
import ResetPassword from "./features/authentication/ResetPassword";
import { BuyAndSellComponent } from "./features/cards/BuyAndSellComponent";
import { BuyCardComponent } from "./features/cards/BuyCardComponent";
import { SellCardComponent } from "./features/cards/SellCardComponent";
import Home from "./features/Home";
import PlayersIndex from "./features/players/PlayersIndex";
import { AddProfile } from "./features/profiles/AddProfile";
import { CurrentProfile } from "./features/profiles/CurrentProfile";
import { EditProfile } from "./features/profiles/EditProfile";
import { IndexProfiles } from "./features/profiles/IndexProfiles";
import TradesIndex from "./features/history/TradesIndex";

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
        path="/profile/index"
        element={<PrivateOutlet path="/profile/index" />}
      >
        <Route path="/profile/index" element={<IndexProfiles />} />
      </Route>
      <Route
        path="/profile/add"
        element={<PrivateOutlet path="/profile/add" />}
      >
        <Route path="/profile/add" element={<AddProfile />} />
      </Route>
      <Route
        path="/profile/index/:email"
        element={<PrivateOutlet path="/profile/index/:email" />}
      >
        <Route path="/profile/index/:email" element={<CurrentProfile />} />
      </Route>
      <Route path="/cards/buy" element={<PrivateOutlet path="/cards/buy" />}>
        <Route path="/cards/buy" element={<BuyCardComponent />} />
      </Route>
      <Route
        path="/cards/buy-and-sell"
        element={<PrivateOutlet path="/cards/buy" />}
      >
        <Route path="/cards/buy-and-sell" element={<BuyAndSellComponent />} />
      </Route>
      <Route
        path="/sell/:cardId/:email"
        element={<PrivateOutlet path="/sell/:cardId/:email" />}
      >
        <Route path="/sell/:cardId/:email" element={<SellCardComponent />} />
      </Route>
      <Route
        path="/profiles/edit/:email"
        element={<PrivateOutlet path="/profiles/edit/:email" />}
      >
        <Route path="/profiles/edit/:email" element={<EditProfile />} />
      </Route>
      <Route
        path="/registration/email-confirmed"
        element={<EmailConfirmation />}
      />
      <Route path="/auth/email-sent/" element={<EmailSent />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/players" element={<PlayersIndex />} />
      <Route path="/trades/index/:email" element={<TradesIndex />} />
    </Routes>
  );
};

export default AppRouter;
