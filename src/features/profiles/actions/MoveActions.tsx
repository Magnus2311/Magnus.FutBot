import { MoveActionDTO } from "../../../models/models";
import * as Icon from "react-bootstrap-icons";
import { useAppDispatch } from "../../../app/hooks";
import { TradeActionType } from "../../authentication/models";
import { onActionCancel } from "./tradeActions";

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
              <Icon.PlusCircleFill size={20} color="green" />
              Priority: {moveAction.priority}
              <Icon.XCircleFill
                color="red"
                style={{ marginLeft: 20, cursor: "pointer" }}
                size={20}
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
