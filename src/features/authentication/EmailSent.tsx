import { useSearchParams } from "react-router-dom";
import Logo from "../common/Logo";

const EmailSent = () => {
  const [searchParams] = useSearchParams();

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "30rem",
        margin: "0 auto",
      }}
    >
      <Logo
        style={{
          height: "64px",
          width: "64px",
        }}
      />
      <h3>Confirmation e-mail sent to: {searchParams.get("email")}</h3>
      <h5>You will be able to sign-in as soon as e-mail is confirmed.</h5>
    </div>
  );
};

export default EmailSent;
