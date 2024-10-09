import { ChangeEvent, FunctionComponent, Ref } from "react";
import { TextField, Box, Typography } from "@mui/material";

interface TextBoxProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  validation?: {
    isValid: boolean;
    alertMessage: string;
  };
  handleBlur?: () => void;
  inputRef?: Ref<HTMLInputElement>;
}

const TextBox: FunctionComponent<TextBoxProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  type,
  value,
  autoFocus,
  disabled,
  validation,
  handleBlur,
  inputRef,
}) => {
  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Typography variant="h6" sx={{ textAlign: "left" }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type={type ? type : "text"}
        name={name}
        inputRef={inputRef}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        onBlur={handleBlur}
        error={validation?.isValid === false}
        helperText={
          validation?.isValid === false ? validation.alertMessage : ""
        }
      />
    </Box>
  );
};

export default TextBox;
