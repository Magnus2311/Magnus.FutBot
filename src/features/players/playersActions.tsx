import { Action, Reducer } from "redux";
import { AppThunk, RootState } from "../../app/store";
import { SIGNALR_PATH } from "../../helpers/constants";
import { Player } from "../../models/models";
import { setupSignalRConnection } from "../../services/communication/signalRConnection";

export interface PlayersState {
  players: Player[];
  status: "idle" | "pending";
}

interface GetPlayersAction {
  type: "GET_PLAYERS";
  players: Player[];
}

interface PendingStatusAction {
  type: "PENDING_STATUS_ACTION";
}

export type KnownAction = GetPlayersAction | PendingStatusAction;

export const getPlayersAction = (players: Player[]): GetPlayersAction => ({
  type: "GET_PLAYERS",
  players,
});

export const pendingStatusAction = (): PendingStatusAction => ({
  type: "PENDING_STATUS_ACTION",
});

export const actionCreators = {
  onPlayersLoaded: (players: Player[]): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(getPlayersAction(players));
    };
  },
};

const initialState = {
  players: [],
  status: "idle",
} as PlayersState;

export const reducer: Reducer<PlayersState> = (
  state = initialState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "GET_PLAYERS":
      return { ...state, players: [...action.players], status: "idle" };
    case "PENDING_STATUS_ACTION":
      return { ...state, status: "pending" };
    default:
      return state;
  }
};

export const { onPlayersLoaded } = actionCreators;

export const selectPlayers = (state: RootState) => state.players;

const connectionHub = `${SIGNALR_PATH}/players`;

export const setupEventsHub = setupSignalRConnection(connectionHub, {
  OnProfilesLoaded: onPlayersLoaded,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (dispatch: any) => {
  dispatch(setupEventsHub); // dispatch is coming from Redux
};
