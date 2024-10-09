import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const LeagueSelect = ({ handleSelect, value }: Props) => {
  return (
    <TextField
      select
      label="Choose league"
      value={value}
      onChange={handleSelect}
      fullWidth
    >
      <MenuItem value="Any">Any</MenuItem>
      <MenuItem value="Premier League (ENG 1)">Premier League (ENG 1)</MenuItem>
      <MenuItem value="EFL Championship (ENG 2)">
        EFL Championship (ENG 2)
      </MenuItem>
      <MenuItem value="EFL League One (ENG 3)">EFL League One (ENG 3)</MenuItem>
      <MenuItem value="EFL League Two (ENG 4)">EFL League Two (ENG 4)</MenuItem>
      <MenuItem value="Ligue 1 Uber Eats (FRA 1)">
        Ligue 1 Uber Eats (FRA 1)
      </MenuItem>
      <MenuItem value="Ligue 2 BKT (FRA 2)">Ligue 2 BKT (FRA 2)</MenuItem>
      <MenuItem value="Serie A TIM (ITA 1)">Serie A TIM (ITA 1)</MenuItem>
      <MenuItem value="Serie BKT (ITA 2)">Serie BKT (ITA 2)</MenuItem>
      <MenuItem value="Bundesliga (GER 1)">Bundesliga (GER 1)</MenuItem>
      <MenuItem value="Bundesliga 2 (GER 2)">Bundesliga 2 (GER 2)</MenuItem>
      <MenuItem value="3. Liga (GER 3)">3. Liga (GER 3)</MenuItem>
      <MenuItem value="LaLiga Santander (ESP 1)">
        LaLiga Santander (ESP 1)
      </MenuItem>
      <MenuItem value="LaLiga SmartBank (ESP 2)">
        LaLiga SmartBank (ESP 2)
      </MenuItem>
      <MenuItem value="1A Pro League (BEL 1)">1A Pro League (BEL 1)</MenuItem>
      <MenuItem value="3F Superliga (DEN 1)">3F Superliga (DEN 1)</MenuItem>
      <MenuItem value="A-League (AUS 1)">A-League (AUS 1)</MenuItem>
      <MenuItem value="Allsvenskan (SWE 1)">Allsvenskan (SWE 1)</MenuItem>
      <MenuItem value="cinch Prem (SPFL)">cinch Prem (SPFL)</MenuItem>
      <MenuItem value="CSL (CHN 1)">CSL (CHN 1)</MenuItem>
      <MenuItem value="CSSL (SUI 1)">CSSL (SUI 1)</MenuItem>
      <MenuItem value="Eliteserien (NOR 1)">Eliteserien (NOR 1)</MenuItem>
      <MenuItem value="England Div. 5 (ENG 5)">England Div. 5 (ENG 5)</MenuItem>
      <MenuItem value="Eredivisie (NED 1)">Eredivisie (NED 1)</MenuItem>
      <MenuItem value="Finnliiga (FIN 1)">Finnliiga (FIN 1)</MenuItem>
      <MenuItem value="Hellas Liga (GRE 1)">Hellas Liga (GRE 1)</MenuItem>
      <MenuItem value="Hero ISL (IND 1)">Hero ISL (IND 1)</MenuItem>
      <MenuItem value="Icons (ICN)">Icons (ICN)</MenuItem>
      <MenuItem value="K League 1 (KOR 1)">K League 1 (KOR 1)</MenuItem>
      <MenuItem value="Libertadores (LIB)">Libertadores (LIB)</MenuItem>
      <MenuItem value="Liga Colombia (COL 1)">Liga Colombia (COL 1)</MenuItem>
      <MenuItem value="Liga Cyprus (CYP 1)">Liga Cyprus (CYP 1)</MenuItem>
      <MenuItem value="Liga Hrvatska (CRO 1)">Liga Hrvatska (CRO 1)</MenuItem>
      <MenuItem value="Liga Portugal (POR 1)">Liga Portugal (POR 1)</MenuItem>
      <MenuItem value="LPF (ARG 1)">LPF (ARG 1)</MenuItem>
      <MenuItem value="Magyar Liga (HUN 1)">Magyar Liga (HUN 1)</MenuItem>
      <MenuItem value="MBS Pro League (SAU 1)">MBS Pro League (SAU 1)</MenuItem>
      <MenuItem value="Men's National (INT)">Men's National (INT)</MenuItem>
      <MenuItem value="MLS (MLS)">MLS (MLS)</MenuItem>
      <MenuItem value="PKO Ekstraklasa (POL 1)">
        PKO Ekstraklasa (POL 1)
      </MenuItem>
      <MenuItem value="South African FL (RSA 1)">
        South African FL (RSA 1)
      </MenuItem>
      <MenuItem value="Special League (Special League)">
        Special League (Special League)
      </MenuItem>
      <MenuItem value="SSE Airtricity PD (IRL 1)">
        SSE Airtricity PD (IRL 1)
      </MenuItem>
      <MenuItem value="Sudamericana (SUD)">Sudamericana (SUD)</MenuItem>
      <MenuItem value="Süper Lig (TUR 1)">Süper Lig (TUR 1)</MenuItem>
      <MenuItem value="SUPERLIGA (ROM 1)">SUPERLIGA (ROM 1)</MenuItem>
      <MenuItem value="Ukrayina Liha (UKR 1)">Ukrayina Liha (UKR 1)</MenuItem>
      <MenuItem value="United Emirates League (UAE 1)">
        United Emirates League (UAE 1)
      </MenuItem>
      <MenuItem value="Ö. Bundesliga (AUT 1)">Ö. Bundesliga (AUT 1)</MenuItem>
      <MenuItem value="Česká Liga (CZE 1)">Česká Liga (CZE 1)</MenuItem>
    </TextField>
  );
};
