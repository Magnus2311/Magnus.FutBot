import { SellActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";

interface Props {
  sellAction: SellActionDTO;
  onActionCancel: () => void;
}

export const SellAction = ({ sellAction, onActionCancel }: Props) => {
  return (
    <div>
      <Icon.FileMinusFill size={30} color="green" />
      Player: {sellAction.sellCardDTO.card?.name}
      Rating: {sellAction.sellCardDTO.card?.rating}
      Priority: {sellAction.priority}
      <Icon.XCircleFill
        color="red"
        style={{ marginLeft: 20, cursor: "pointer" }}
        size={30}
        onClick={onActionCancel}
      />
    </div>
  );
};
