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
      <Logo />
      <h3>Confirmation e-mail sent to: {searchParams.get("email")}</h3>
      <div>"You will be able to sign-in as soon as e-mail is confirmed."</div>
    </div>
  );
};

export default EmailSent;
