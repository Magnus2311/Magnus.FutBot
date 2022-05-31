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
  validation?: {
    isValid: boolean;
    alertMessage: string;
  };
  handleBlur?: () => void;
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
  validation,
  handleBlur,
}) => {
  return (
    <div className={`form-group`} style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input
        className={`form-control${
          validation?.isValid ? "" : " invalid-content"
        }`}
        type={type ? type : "text"}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        onBlur={handleBlur}
      />
      {validation?.isValid === false && (
        <div
          className="alert alert-danger alert-sm"
          style={{
            height: "36px",
            padding: "5px 12px",
          }}
        >
          {validation.alertMessage}
        </div>
      )}
    </div>
  );
};

export default TextBox;
