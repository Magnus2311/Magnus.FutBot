import React, { ChangeEvent, FunctionComponent } from "react";
import "./TextBox.css";

interface TextBoxProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  autoFocus?: boolean;
  disabled?: boolean;
  isValid?: boolean;
}

const TextBox: FunctionComponent<TextBoxProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  type,
  value,
  ref,
  autoFocus,
  disabled,
  isValid,
}) => {
  return (
    <div className="form-group" style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input
        className={`form-control${isValid ? "" : " invalid-content"}`}
        type={type ? type : "text"}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
      />
    </div>
  );
};

export default TextBox;
