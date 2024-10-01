import { BuyActionDTO } from "../../../models/models";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon style={{ color: "green", marginRight: 8 }} />
                <span>Player: {buyAction.buyCardDTO.card.name}</span>
                <span style={{ marginLeft: 10 }}>
                  Rating: {buyAction.buyCardDTO.card.overallRating}
                </span>
                <span style={{ marginLeft: 10 }}>
                  Priority: {buyAction.priority}
                </span>
                <DeleteIcon
                  color="error"
                  style={{ marginLeft: 20, cursor: "pointer" }}
                  onClick={() =>
                    handleActionCancellation(buyAction.id, TradeActionType.Buy)
                  }
                />
              </div>
            ) : (
              <CircularProgress size={20} />
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
