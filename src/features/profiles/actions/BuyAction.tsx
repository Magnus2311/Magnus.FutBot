import { BuyActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

interface Props {
  buyAction: BuyActionDTO;
  onActionCancel: () => void;
}

export const BuyAction = ({ buyAction, onActionCancel }: Props) => {
  return (
    <>
      {buyAction.buyCardDTO.card ? (
        <div>
          <Icon.Plus size={30} color="green" />
          Player: {buyAction.buyCardDTO.card?.name}
          Rating: {buyAction.buyCardDTO.card?.rating}
          Priority: {buyAction.priority}
          <Icon.XCircleFill
            color="red"
            style={{ marginLeft: 20, cursor: "pointer" }}
            size={30}
            onClick={onActionCancel}
          />
        </div>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};
