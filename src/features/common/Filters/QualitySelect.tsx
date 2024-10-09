import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const QualitySelect = ({ handleSelect, value }: Props) => {
  return (
    <TextField
      select
      label="Choose quality"
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      <MenuItem value="Any">Any</MenuItem>
      <MenuItem value="Bronze">Bronze</MenuItem>
      <MenuItem value="Silver">Silver</MenuItem>
      <MenuItem value="Gold">Gold</MenuItem>
      <MenuItem value="Special">Special</MenuItem>
    </TextField>
  );
};
