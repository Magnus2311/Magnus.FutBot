import { createRef, MouseEvent } from "react";
import "./Switch.css";

interface SwitchProps {
  label?: string;
  isChecked: boolean;
  setIsChecked: () => void;
  name?: string;
}

export const Switch = ({
  label,
  isChecked,
  setIsChecked,
  name,
}: SwitchProps) => {
  const element = createRef<HTMLInputElement>();

  const handleLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
    element.current?.click();
  };

  return (
    <div className="form-group">
      <label className="switch">
        <input
          ref={element}
          type="checkbox"
          name={name ?? ""}
          checked={isChecked}
          onChange={setIsChecked}
        />
        <span className="slider"></span>
      </label>
      <label
        style={{ paddingLeft: "10px", cursor: "pointer" }}
        onClick={handleLabelClick}
      >
        {label}
      </label>
    </div>
  );
};
