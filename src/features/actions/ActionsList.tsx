import { useParams } from "react-router";

export const ActionsList = () => {
  const { email } = useParams();

  return <>{email}</>;
};
