import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
export const QualitySelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select
      aria-label="Choose account to buy for: "
      onChange={handleSelect}
      value={value}
    >
      <option
        selected
        style={{
          backgroundImage:
            "https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/any.png",
        }}
      >
        Any
      </option>
      <option
        style={{
          backgroundImage:
            "https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/bronze.png",
        }}
      >
        Bronze
      </option>
      <option
        style={{
          backgroundImage:
            "https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/silver.png",
        }}
      >
        Silver
      </option>
      <option
        style={{
          backgroundImage:
            "https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/gold.png",
        }}
      >
        Gold
      </option>
    </Form.Select>
  );
};
