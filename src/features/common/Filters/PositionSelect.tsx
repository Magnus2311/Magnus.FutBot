import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const PositionSelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select onChange={handleSelect} value={value}>
      <option selected>Any</option>
      <option>Defenders</option>
      <option>Midfielders</option>
      <option>Attackers</option>
      <option>GK</option>
      <option>RWB</option>
      <option>RB</option>
      <option>CB</option>
      <option>LB</option>
      <option>LWB</option>
      <option>CDM</option>
      <option>RM</option>
      <option>CM</option>
      <option>LM</option>
      <option>CAM</option>
      <option>CF</option>
      <option>RW</option>
      <option>ST</option>
      <option>LW</option>
    </Form.Select>
  );
};
