import { MoveActionDTO } from "../../../models/models";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  profileId: string;
  moveActions: MoveActionDTO[];
}

export const MoveActions = ({ profileId, moveActions }: Props) => {
  const dispatch = useAppDispatch();

  const handleActionCancellation = (
    actionId: string,
    actionType: TradeActionType
  ) => {
    dispatch(onActionCancel(profileId, actionId, actionType));
  };

  return moveActions && moveActions.length > 0 ? (
    <>
      Move actions:
      <hr />
      {moveActions.map((moveAction) => {
        return (
          <>
            <div>
              <ShoppingCartIcon style={{ color: "yellow", marginRight: 8 }} />
              Priority: {moveAction.priority}
              <DeleteIcon
                style={{ marginLeft: 20, cursor: "pointer" }}
                onClick={() =>
                  handleActionCancellation(moveAction.id, TradeActionType.Move)
                }
              />
            </div>
            <hr />
          </>
        );
      })}
    </>
  ) : (
    <>
      <div>No pending move actions</div>
      <hr />
    </>
  );
};
