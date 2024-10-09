import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const ChemistrySelect = ({ handleSelect, value }: Props) => {
  return (
    <TextField
      select
      label="Choose chemistry"
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      <MenuItem value="Any">Any</MenuItem>
      <MenuItem value="BASIC">BASIC</MenuItem>
      <MenuItem value="SNIPER">SNIPER</MenuItem>
      <MenuItem value="FINISHER">FINISHER</MenuItem>
      <MenuItem value="DEADEYE">DEADEYE</MenuItem>
      <MenuItem value="MARKSMAN">MARKSMAN</MenuItem>
      <MenuItem value="HAWK">HAWK</MenuItem>
      <MenuItem value="ARTIST">ARTIST</MenuItem>
      <MenuItem value="ARCHITECT">ARCHITECT</MenuItem>
      <MenuItem value="POWERHOUSE">POWERHOUSE</MenuItem>
      <MenuItem value="MAESTRO">MAESTRO</MenuItem>
      <MenuItem value="ENGINE">ENGINE</MenuItem>
      <MenuItem value="SENTINEL">SENTINEL</MenuItem>
      <MenuItem value="GUARDIAN">GUARDIAN</MenuItem>
      <MenuItem value="GLADIATOR">GLADIATOR</MenuItem>
      <MenuItem value="BACKBONE">BACKBONE</MenuItem>
      <MenuItem value="ANCHOR">ANCHOR</MenuItem>
      <MenuItem value="HUNTER">HUNTER</MenuItem>
      <MenuItem value="CATALYST">CATALYST</MenuItem>
      <MenuItem value="SHADOW">SHADOW</MenuItem>
      <MenuItem value="WALL">WALL</MenuItem>
      <MenuItem value="SHIELD">SHIELD</MenuItem>
      <MenuItem value="CAT">CAT</MenuItem>
      <MenuItem value="GLOVE">GLOVE</MenuItem>
      <MenuItem value="GK BASIC">GK BASIC</MenuItem>
    </TextField>
  );
};
