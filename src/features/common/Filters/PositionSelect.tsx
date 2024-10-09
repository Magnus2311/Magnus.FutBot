import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const PositionSelect = ({ handleSelect, value }: Props) => {
  return (
    <TextField
      select
      label="Choose position"
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      <MenuItem value="Any">Any</MenuItem>
      <MenuItem value="Defenders">Defenders</MenuItem>
      <MenuItem value="Midfielders">Midfielders</MenuItem>
      <MenuItem value="Attackers">Attackers</MenuItem>
      <MenuItem value="GK">GK</MenuItem>
      <MenuItem value="RWB">RWB</MenuItem>
      <MenuItem value="RB">RB</MenuItem>
      <MenuItem value="CB">CB</MenuItem>
      <MenuItem value="LB">LB</MenuItem>
      <MenuItem value="LWB">LWB</MenuItem>
      <MenuItem value="CDM">CDM</MenuItem>
      <MenuItem value="RM">RM</MenuItem>
      <MenuItem value="CM">CM</MenuItem>
      <MenuItem value="LM">LM</MenuItem>
      <MenuItem value="CAM">CAM</MenuItem>
      <MenuItem value="CF">CF</MenuItem>
      <MenuItem value="RW">RW</MenuItem>
      <MenuItem value="ST">ST</MenuItem>
      <MenuItem value="LW">LW</MenuItem>
    </TextField>
  );
};
