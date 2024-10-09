import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  items: string[];
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Select = ({ items, handleSelect, value }: Props) => {
  return (
    <TextField
      select
      placeholder="Choose account to buy for" // Use placeholder instead of label
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};
