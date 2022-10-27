import { SellActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";
import { Spinner } from "react-bootstrap";

interface Props {
  profileId: string;
  sellActions: SellActionDTO[];
}

export const SellActions = ({ profileId, sellActions }: Props) => {
  const dispatch = useAppDispatch();

  const handleActionCancellation = (
    actionId: string,
    actionType: TradeActionType
  ) => {
    dispatch(onActionCancel(profileId, actionId, actionType));
  };

  return sellActions && sellActions.length > 0 ? (
    <>
      Sell actions:
      <hr />
      {sellActions.map((sellAction) => {
        return (
          <>
            {sellAction.sellCardDTO.card ? (
              <div>
                <Icon.PlusCircleFill size={20} color="green" />
                Player: {sellAction.sellCardDTO.card?.name}
                Rating: {sellAction.sellCardDTO.card?.rating}
                Priority: {sellAction.priority}
                <Icon.XCircleFill
                  color="red"
                  style={{ marginLeft: 20, cursor: "pointer" }}
                  size={20}
                  onClick={() =>
                    handleActionCancellation(sellAction.id, TradeActionType.Buy)
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
      <div>No pending sell actions</div>
      <hr />
    </>
  );
};
