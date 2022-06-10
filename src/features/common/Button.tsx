import { FormEvent } from "react";

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
    <button
      className={className ?? "btn btn-primary btn-xl"}
      style={{
        ...style,
        width: style?.width ?? "100%",
        marginTop: style?.marginTop ?? "1rem",
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
