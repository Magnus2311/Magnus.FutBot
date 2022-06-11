interface Props {
  type:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg";
  content: string;
  style?: React.CSSProperties;
}

export const Alert = ({ type, size, content, style }: Props) => {
  return (
    <div
      className={`alert alert-${type} alert-${size ?? "sm"}`}
      style={{
        ...style,
        height: style?.height ?? "36px",
        padding: style?.padding ?? "5px 12px",
      }}
    >
      {content}
    </div>
  );
};
