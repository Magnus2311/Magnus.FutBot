import { useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  path: string;
  props?: any;
}

const Navigate = ({ path, props }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path, props);
  }, [navigate, path, props]);

  return <></>;
};

export default Navigate;
