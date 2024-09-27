import logo from "../../assets/coin.png";

interface Props {
  style?: React.CSSProperties;
}

const Logo = ({ style }: Props) => {
  const currentStyle = {
    ...style,
    height: style?.height ?? "32px",
    width: style?.width ?? "32px",
  } as React.CSSProperties;
  return <img src={logo} alt="Life Mode logo" style={currentStyle} />;
};
export default Logo;
