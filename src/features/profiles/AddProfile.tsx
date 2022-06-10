import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { Button } from "../common/Button";
import TextBox from "../common/TextBox";
import { addProfileAsync } from "./profileSlice";

export const AddProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("iavor.orlyov1@gmail.com");
  const [password, setPassword] = useState("A123123123a");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addProfileAsync({
        email: email,
        password: password,
      })
    );

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextBox
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        label="E-mail"
        name="email"
        placeholder="Enter your e-mail"
        type="text"
        autoFocus
      />
      <TextBox
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <Button>Add EA Profile</Button>
    </form>
  );
};
