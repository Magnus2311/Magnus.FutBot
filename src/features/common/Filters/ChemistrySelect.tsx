import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const ChemistrySelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select onChange={handleSelect} value={value}>
      <option>Any</option>
      <option>BASIC</option>
      <option>SNIPER</option>
      <option>FINISHER</option>
      <option>DEADEYE</option>
      <option>MARKSMAN</option>
      <option>HAWK</option>
      <option>ARTIST</option>
      <option>ARCHITECT</option>
      <option>POWERHOUSE</option>
      <option>MAESTRO</option>
      <option>ENGINE</option>
      <option>SENTINEL</option>
      <option>GUARDIAN</option>
      <option>GLADIATOR</option>
      <option>BACKBONE</option>
      <option>ANCHOR</option>
      <option>HUNTER</option>
      <option>CATALYST</option>
      <option>SHADOW</option>
      <option>WALL</option>
      <option>SHIELD</option>
      <option>CAT</option>
      <option>GLOVE</option>
      <option>GK BASIC</option>
    </Form.Select>
  );
};
