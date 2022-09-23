import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const NationallitySelect = ({ handleSelect, value }: Props) => {
  return (
    <Form.Select onChange={handleSelect} value={value}>
      <option selected>Any</option>
      <option>Argentina</option>
      <option>Brazil</option>
      <option>England</option>
      <option>France</option>
      <option>Germany</option>
      <option>Netherlands</option>
      <option>Italy</option>
      <option>Portugal</option>
      <option>Spain</option>
      <option>Afghanist.</option>
      <option>Albania</option>
      <option>Algeria</option>
      <option>Andorra</option>
      <option>Angola</option>
      <option>Antigua B.</option>
      <option>Argentina</option>
      <option>Armenia</option>
      <option>Austraoptiona</option>
      <option>Austria</option>
      <option>Azerbaijan</option>
      <option>Belarus</option>
      <option>Belgium</option>
      <option>Benin</option>
      <option>Bermuda</option>
      <option>Booptionvia</option>
      <option>Bosnia-H.</option>
      <option>Brazil</option>
      <option>Bulgaria</option>
      <option>Burk. Faso</option>
      <option>Burundi</option>
      <option>Cameroon</option>
      <option>Canada</option>
      <option>Cape Verde</option>
      <option>CAR</option>
      <option>Chad</option>
      <option>Chile</option>
      <option>China PR</option>
      <option>Chinese Taipei</option>
      <option>Colombia</option>
      <option>Comoros</option>
      <option>Congo</option>
      <option>Costa Rica</option>
      <option>Croatia</option>
      <option>Cuba</option>
      <option>Cyprus</option>
      <option>Czech Rep.</option>
      <option>Denmark</option>
      <option>Dom. Rep.</option>
      <option>DR Congo</option>
      <option>E. Guinea</option>
      <option>Ecuador</option>
      <option>Egypt</option>
      <option>El Salvad.</option>
      <option>England</option>
      <option>Estonia</option>
      <option>Ethiopia</option>
      <option>Faroe Isl.</option>
      <option>Fiji</option>
      <option>Finland</option>
      <option>France</option>
      <option>Gabon</option>
      <option>Gambia</option>
      <option>Georgia</option>
      <option>Germany</option>
      <option>Ghana</option>
      <option>Gibraltar</option>
      <option>Greece</option>
      <option>Grenada</option>
      <option>Guam</option>
      <option>Guatemala</option>
      <option>Guinea</option>
      <option>Guinea-Bis</option>
      <option>Guyana</option>
      <option>Haiti</option>
      <option>Honduras</option>
      <option>Hong Kong</option>
      <option>Hungary</option>
      <option>Iceland</option>
      <option>India</option>
      <option>Indonesia</option>
      <option>Iran</option>
      <option>Iraq</option>
      <option>Ireland</option>
      <option>Israel</option>
      <option>Italy</option>
      <option>Ivory Coast</option>
      <option>Jamaica</option>
      <option>Japan</option>
      <option>Kazakhstan</option>
      <option>Kenya</option>
      <option>Korea DPR</option>
      <option>Korea Rep.</option>
      <option>Kosovo</option>
      <option>Latvia</option>
      <option>Lebanon</option>
      <option>optionberia</option>
      <option>optionbya</option>
      <option>optionechten.</option>
      <option>optionthuania</option>
      <option>Luxemburg</option>
      <option>Macedonia</option>
      <option>Madagascar</option>
      <option>Malaysia</option>
      <option>Maoption</option>
      <option>Malta</option>
      <option>Mauritania</option>
      <option>Mauritius</option>
      <option>Mexico</option>
      <option>Moldova</option>
      <option>Montenegro</option>
      <option>Montserrat</option>
      <option>Morocco</option>
      <option>Mozambique</option>
      <option>N. Ireland</option>
      <option>N.Antilles</option>
      <option>Namibia</option>
      <option>Netherlands</option>
      <option>New Zealand</option>
      <option>Niger</option>
      <option>Nigeria</option>
      <option>Norway</option>
      <option>Panama</option>
      <option>Papua New Guinea</option>
      <option>Paraguay</option>
      <option>Peru</option>
      <option>Phioptionppines</option>
      <option>Poland</option>
      <option>Portugal</option>
      <option>Puerto Rico</option>
      <option>Romania</option>
      <option>Russia</option>
      <option>S. Africa</option>
      <option>São Tomé &amp; Príncipe</option>
      <option>Saudi Ara.</option>
      <option>Scotland</option>
      <option>Senegal</option>
      <option>Serbia</option>
      <option>Sierra L.</option>
      <option>Singapore</option>
      <option>Slovakia</option>
      <option>Slovenia</option>
      <option>South Sudan</option>
      <option>Spain</option>
      <option>St Kitts Nevis</option>
      <option>St Lucia</option>
      <option>Sudan</option>
      <option>Suriname</option>
      <option>Sweden</option>
      <option>Switzerl.</option>
      <option>Syria</option>
      <option>Tanzania</option>
      <option>Thailand</option>
      <option>Togo</option>
      <option>Trinidad</option>
      <option>Tunisia</option>
      <option>Turkey</option>
      <option>Uganda</option>
      <option>Ukraine</option>
      <option>United Arab Emirates</option>
      <option>Uruguay</option>
      <option>USA</option>
      <option>Uzbekistan</option>
      <option>Venezuela</option>
      <option>Wales</option>
      <option>Zambia</option>
      <option>Zimbabwe</option>
    </Form.Select>
  );
};
