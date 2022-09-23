import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const LeagueSelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select onChange={handleSelect} value={value}>
      <option>Any</option>
      <option>Premier League (ENG 1)</option>
      <option>EFL Championship (ENG 2)</option>
      <option>EFL League One (ENG 3)</option>
      <option>EFL League Two (ENG 4)</option>
      <option>Ligue 1 Uber Eats (FRA 1)</option>
      <option>Ligue 2 BKT (FRA 2)</option>
      <option>Serie A TIM (ITA 1)</option>
      <option>Serie BKT (ITA 2)</option>
      <option>Bundesliga (GER 1)</option>
      <option>Bundesliga 2 (GER 2)</option>
      <option>3. Liga (GER 3)</option>
      <option>LaLiga Santander (ESP 1)</option>
      <option>LaLiga SmartBank (ESP 2)</option>
      <option>1A Pro League (BEL 1)</option>
      <option>3F Superliga (DEN 1)</option>
      <option>A-League (AUS 1)</option>
      <option>Allsvenskan (SWE 1)</option>
      <option>cinch Prem (SPFL)</option>
      <option>CSL (CHN 1)</option>
      <option>CSSL (SUI 1)</option>
      <option>Eliteserien (NOR 1)</option>
      <option>England Div. 5 (ENG 5)</option>
      <option>Eredivisie (NED 1)</option>
      <option>Finnliiga (FIN 1)</option>
      <option>Hellas Liga (GRE 1)</option>
      <option>Hero ISL (IND 1)</option>
      <option>Icons (ICN)</option>
      <option>K League 1 (KOR 1)</option>
      <option>Libertadores (LIB)</option>
      <option>Liga Colombia (COL 1)</option>
      <option>Liga Cyprus (CYP 1)</option>
      <option>Liga Hrvatska (CRO 1)</option>
      <option>Liga Portugal (POR 1)</option>
      <option>LPF (ARG 1)</option>
      <option>Magyar Liga (HUN 1)</option>
      <option>MBS Pro League (SAU 1)</option>
      <option>Men's National (INT)</option>
      <option>MLS (MLS)</option>
      <option>PKO Ekstraklasa (POL 1)</option>
      <option>South African FL (RSA 1)</option>
      <option>Special League (Special League)</option>
      <option>SSE Airtricity PD (IRL 1)</option>
      <option>Sudamericana (SUD)</option>
      <option>Süper Lig (TUR 1)</option>
      <option>SUPERLIGA (ROM 1)</option>
      <option>Ukrayina Liha (UKR 1)</option>
      <option>United Emirates League (UAE 1)</option>
      <option>Ö. Bundesliga (AUT 1)</option>
      <option>Česká Liga (CZE 1)</option>
    </Form.Select>
  );
};
