import { FormEvent } from "react";
import { Button as MUIButton } from "@mui/material";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  style,
  className,
  disabled,
  onClick,
}: Props) => {
  return (
    <MUIButton
      variant="contained"
      className={className}
      style={{
        ...style,
        width: style?.width ?? "100%",
        marginTop: style?.marginTop ?? "1rem",
      }}
      disabled={disabled}
      onClick={onClick}
      fullWidth
    >
      {children}
    </MUIButton>
  );
};
