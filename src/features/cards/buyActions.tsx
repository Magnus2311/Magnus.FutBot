import { HubConnection } from "@microsoft/signalr";
import { Action, Reducer } from "redux";
import { AppThunk, RootState } from "../../app/store";
import { SIGNALR_PATH } from "../../helpers/constants";
import { Card } from "../../models/models";
import { setupSignalRConnection } from "../../services/communication/signalRConnection";

export interface CardsState {
  cards: Card[];
  status: "idle" | "pending";
}

interface GetCardsAction {
  type: "GET_CARDS";
  cards: Card[];
}

interface PendingStatusAction {
  type: "PENDING_STATUS_ACTION";
}

export type KnownAction = GetCardsAction | PendingStatusAction;

export const getCardsAction = (cards: Card[]): GetCardsAction => ({
  type: "GET_CARDS",
  cards,
});

export const pendingStatusAction = (): PendingStatusAction => ({
  type: "PENDING_STATUS_ACTION",
});

export const actionCreators = {
  onCardsLoaded: (cards: Card[]): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(getCardsAction(cards));
    };
  },
};

const initialState = {
  cards: [],
  status: "idle",
} as CardsState;

export const reducer: Reducer<CardsState> = (
  state = initialState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "GET_CARDS":
      return { ...state, cards: [...action.cards], status: "idle" };
    case "PENDING_STATUS_ACTION":
      return { ...state, status: "pending" };
    default:
      return state;
  }
};

export const { onCardsLoaded } = actionCreators;

export const selectCards = (state: RootState) => state.cards;

const connectionHub = `${SIGNALR_PATH}/cards`;

let cardsConnection: HubConnection | undefined = undefined;

export const getCardsConnection = async (
  dispatch: any
): Promise<HubConnection> => {
  if (cardsConnection) return cardsConnection;

  cardsConnection = await setupEventsHub(dispatch);
  return cardsConnection;
};

export const setupEventsHub = setupSignalRConnection(connectionHub, {
  OnCardsLoaded: onCardsLoaded,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (dispatch: any) => {
  dispatch(setupEventsHub); // dispatch is coming from Redux
};
