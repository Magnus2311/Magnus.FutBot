import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../common/Button";

export const RedirectToAdd = () => {
  const navigate = useNavigate();

  const handleAdd = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate("/profile/add");
  };

  return <Button onClick={handleAdd}>Add new profile</Button>;
};
