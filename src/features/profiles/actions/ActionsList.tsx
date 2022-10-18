import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { onActionsRequested, selectActions } from "./tradeActions";
import { BuyActions } from "./BuyActions";
import { SellActions } from "./SellActions";
import { MoveActions } from "./MoveActions";

interface Props {
  profileId: string;
}

export const ActionsList = ({ profileId }: Props) => {
  const { actions } = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onActionsRequested(profileId));
  }, [profileId, dispatch]);

  return (
    <>
      <BuyActions profileId={profileId} buyActions={actions.buyActions} />
      <SellActions profileId={profileId} sellActions={actions.sellActions} />
      <MoveActions profileId={profileId} moveActions={actions.moveActions} />
    </>
  );
};
