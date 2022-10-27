import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const QualitySelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select
      aria-label="Choose quality:"
      onChange={handleSelect}
      value={value}
    >
      <option selected>Any</option>
      <option>Bronze</option>
      <option>Silver</option>
      <option>Gold</option>
      <option>Special</option>
    </Form.Select>
  );
};
