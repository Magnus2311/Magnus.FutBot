import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  onActionCancel,
  onActionsRequested,
  selectActions,
} from "./tradeActions";
import * as Icon from "react-bootstrap-icons";

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
      {actions.map((action) => {
        return (
          <>
            {action.id} - {action.type} - {action.description}
            <Icon.XCircleFill
              onClick={() => {
                dispatch(onActionCancel(profileId, action.id));
              }}
            />
          </>
        );
      })}
    </>
  );
};
