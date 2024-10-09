import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const RaritySelect = ({ handleSelect, value }: Props) => {
  return (
    <TextField
      select
      label="Choose rarity"
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      <MenuItem value="Any">Any</MenuItem>
      <MenuItem value="Common">Common</MenuItem>
      <MenuItem value="Rare">Rare</MenuItem>
      <MenuItem value="CONMEBOL Libertadores">CONMEBOL Libertadores</MenuItem>
      <MenuItem value="CONMEBOL SUDAMERICANA">CONMEBOL SUDAMERICANA</MenuItem>
      <MenuItem value="FUT Heroes">FUT Heroes</MenuItem>
      <MenuItem value="Icon">Icon</MenuItem>
      <MenuItem value="Ones to Watch">Ones to Watch</MenuItem>
      <MenuItem value="Team of the Week">Team of the Week</MenuItem>
      <MenuItem value="UEFA Champions League Road to the Final">
        UEFA Champions League Road to the Final
      </MenuItem>
      <MenuItem value="UEFA Europa League Road to the Final">
        UEFA Europa League Road to the Final
      </MenuItem>
    </TextField>
  );
};
