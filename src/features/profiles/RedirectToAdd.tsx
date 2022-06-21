import { FormEvent } from "react";
import { useNavigate } from "react-router";
import plus from "../../assets/common/plus.png";

export const RedirectToAdd = () => {
  const navigate = useNavigate();

  const handleAdd = (e: FormEvent<HTMLImageElement>) => {
    e.preventDefault();

    navigate("/profile/add");
  };

  return (
    <img
      src={plus}
      onClick={handleAdd}
      alt="Add profile"
      style={{ cursor: "pointer" }}
    />
  );
};
