import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  onActionCancel,
  onActionsRequested,
  selectActions,
} from "./tradeActions";
import * as Icon from "react-bootstrap-icons";
import { BuyAction } from "./BuyAction";
import { SellAction } from "./SellAction";
import { MoveAction } from "./MoveAction";
import { TradeActionType } from "../../authentication/models";

interface Props {
  profileId: string;
}

const renderActionType = (actionType: string) => {
  switch (actionType) {
    case "Buy":
      return <Icon.Plus size={30} color="green" />;
    case "Sell":
      return <Icon.Stop size={30} color="red" />;
    case "Move":
      return <Icon.Arrow90degRight size={30} color="blue" />;
    default:
      return "asd";
  }
};

export const ActionsList = ({ profileId }: Props) => {
  const { actions } = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onActionsRequested(profileId));
  }, [profileId, dispatch]);

  const handleActionCancellation = (
    actionId: string,
    actionType: TradeActionType
  ) => {
    dispatch(onActionCancel(actionId, actionType));
  };

  return (
    <>
      Buy actions:
      <hr />
      {actions.buyActions.map((buyAction) => {
        return (
          <BuyAction
            buyAction={buyAction}
            onActionCancel={() =>
              handleActionCancellation(buyAction.id, TradeActionType.Buy)
            }
          />
        );
      })}
      <hr />
      Sell actions:
      <hr />
      {actions.sellActions.map((sellAction) => {
        return (
          <SellAction
            sellAction={sellAction}
            onActionCancel={() =>
              handleActionCancellation(sellAction.id, TradeActionType.Sell)
            }
          />
        );
      })}
      <hr />
      Move actions:
      <hr />
      {actions.moveActions.map((moveAction) => {
        return (
          <MoveAction
            moveAction={moveAction}
            onActionCancel={() =>
              handleActionCancellation(moveAction.id, TradeActionType.Move)
            }
          />
        );
      })}
    </>
  );
};
