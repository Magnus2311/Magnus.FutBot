import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const RaritySelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select
      aria-label="Choose rarity:"
      onChange={handleSelect}
      value={value}
    >
      <option selected>Any</option>
      <option>Common</option>
      <option>Rare</option>
      <option>CONMEBOL optionBERTADORES</option>
      <option>CONMEBOL SUDAMERICANA</option>
      <option>FUT Heroes</option>
      <option>Icon</option>
      <option>Ones to Watch</option>
      <option>Team of the Week</option>
      <option>UEFA Champions League Road to the Final</option>
      <option>UEFA Europa League Road to the Final</option>
    </Form.Select>
  );
};
