import { HubConnection } from "@microsoft/signalr";
import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { AppThunk, RootState } from "../../../app/store";
import { SIGNALR_PATH } from "../../../helpers/constants";
import { TradeAction } from "../../../models/models";
import { setupSignalRConnection } from "../../../services/communication/signalRConnection";

export interface ActionsState {
  actions: TradeAction[];
}

interface OnActionsLoadedAction {
  type: "ON_ACTIONS_LOADED";
  actions: TradeAction[];
}

interface OnActionCanceledAction {
  type: "ON_ACTION_REMOVED";
  actionId: string;
}

export type KnownAction = OnActionsLoadedAction | OnActionCanceledAction;

export const onActionsLoadedAction = (
  actions: TradeAction[]
): OnActionsLoadedAction => ({
  type: "ON_ACTIONS_LOADED",
  actions,
});

export const onActionCanceledAction = (
  actionId: string
): OnActionCanceledAction => ({
  type: "ON_ACTION_REMOVED",
  actionId,
});

export const actionCreators = {
  onActionsRequested: (profileId: string): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      const connection = await getActionsConnection(dispatch);
      connection.invoke("GetAllActionsByProfileId", profileId);
    };
  },
  onActionsLoaded: (actions: TradeAction[]): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(onActionsLoadedAction(actions));
    };
  },
  onActionCancel: (profileId: string, actionId: string) => {
    return async (dispatch: any) => {
      const connection = await getActionsConnection(dispatch);
      connection.invoke("CancelActionById", profileId, actionId);
    };
  },
  onActionCanceled: (actionId: string) => {
    return async (dispatch: any) => {
      dispatch(onActionCanceledAction(actionId));
    };
  },
};

const initialState = {
  actions: [],
} as ActionsState;

export const actionsReducer: Reducer<ActionsState> = (
  state = initialState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ON_ACTIONS_LOADED":
      return {
        ...state,
        actions: [...action.actions],
      };
    case "ON_ACTION_REMOVED":
      return {
        ...state,
        actions: [...state.actions.filter((a) => a.id !== action.actionId)],
      };
    default:
      return state;
  }
};

export const {
  onActionCanceled,
  onActionsLoaded,
  onActionsRequested,
  onActionCancel,
} = actionCreators;

export const selectActions = (state: RootState) => state.actions;

const connectionHub = `${SIGNALR_PATH}/actions`;

let actionsConnection: HubConnection | undefined = undefined;

export const getActionsConnection = async (dispatch: any) => {
  if (actionsConnection) return actionsConnection;

  actionsConnection = await setupEventsHub(dispatch);
  return actionsConnection;
};

export const setupEventsHub = setupSignalRConnection(connectionHub, {
  OnActionCanceled: onActionCanceled,
  OnActionsLoaded: onActionsLoaded,
});
