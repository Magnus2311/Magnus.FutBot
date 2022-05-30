import { useSearchParams } from "react-router-dom";

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
      <img
        src="/images/logos/logo_transparent.png"
        alt="LifeModeLogo"
        style={{ width: "200px", height: "200px" }}
      />
      <h3>Confirmation e-mail sent to: {searchParams.get("username")}</h3>
      <div>"You will be able to sign-in as soon as e-mail is confirmed."</div>
    </div>
  );
};

export default EmailSent;
