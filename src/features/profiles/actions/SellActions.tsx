import { SellActionDTO } from "../../../models/models";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";
import { Spinner } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

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
                <ShoppingCartIcon style={{ color: "red", marginRight: 8 }} />
                Player: {sellAction.sellCardDTO.card?.name}
                Rating: {sellAction.sellCardDTO.card?.overallRating}
                Priority: {sellAction.priority}
                <DeleteIcon
                  color="error"
                  style={{ marginLeft: 20, cursor: "pointer" }}
                  onClick={() =>
                    handleActionCancellation(
                      sellAction.id,
                      TradeActionType.Sell
                    )
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
