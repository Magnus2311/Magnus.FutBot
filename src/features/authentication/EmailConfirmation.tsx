import Login from "./Login";
import { useSearchParams } from "react-router-dom";

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  return !!username ? (
    <Login username={username} isConfirmation={true} />
  ) : (
    <>Expired Token. Resend new one!</>
  );
};

export default EmailConfirmation;
