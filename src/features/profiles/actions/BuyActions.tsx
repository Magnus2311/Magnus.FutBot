import { BuyActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";

interface Props {
  profileId: string;
  buyActions: BuyActionDTO[];
}

export const BuyActions = ({ profileId, buyActions }: Props) => {
  const dispatch = useAppDispatch();

  const handleActionCancellation = (
    actionId: string,
    actionType: TradeActionType
  ) => {
    dispatch(onActionCancel(profileId, actionId, actionType));
  };

  return buyActions && buyActions.length > 0 ? (
    <>
      Buy actions:
      <hr />
      {buyActions.map((buyAction) => {
        return (
          <>
            {buyAction.buyCardDTO.card ? (
              <div>
                <Icon.PlusCircleFill size={20} color="green" />
                Player: {buyAction.buyCardDTO.card?.name}
                Rating: {buyAction.buyCardDTO.card?.rating}
                Priority: {buyAction.priority}
                <Icon.XCircleFill
                  color="red"
                  style={{ marginLeft: 20, cursor: "pointer" }}
                  size={20}
                  onClick={() =>
                    handleActionCancellation(buyAction.id, TradeActionType.Buy)
                  }
                />
              </div>
            ) : (
              <Spinner animation="border" />
            )}
            <hr />
          </>
        );
      })}
    </>
  ) : (
    <>
      <div>No pending buy actions</div>
      <hr />
    </>
  );
};
