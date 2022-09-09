import { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface Props {
  items: string[];
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const Select = ({ items, handleSelect, value }: Props) => {
  return (
    <Form.Select
      aria-label="Choose account to buy for: "
      onChange={handleSelect}
      value={value}
    >
      {items.map((item) => (
        <option>{item}</option>
      ))}
    </Form.Select>
  );
};
