import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { onActionsRequested, selectActions } from "./tradeActions";
import { BuyActions } from "./BuyActions";
import { SellActions } from "./SellActions";
import { MoveActions } from "./MoveActions";
import { Button } from "../../common/Button";
import { onAllActionsCanceled } from "./tradeActions";

interface Props {
  profileId: string;
}

export const ActionsList = ({ profileId }: Props) => {
  const { actions } = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  const handleDeactivateAllActions = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(onAllActionsCanceled(profileId));
  };

  useEffect(() => {
    dispatch(onActionsRequested(profileId));
  }, [profileId, dispatch]);

  return (
    <>
      <Button onClick={handleDeactivateAllActions}>
        Deactivate All Actions
      </Button>
      <BuyActions profileId={profileId} buyActions={actions.buyActions} />
      <SellActions profileId={profileId} sellActions={actions.sellActions} />
      <MoveActions profileId={profileId} moveActions={actions.moveActions} />
    </>
  );
};
