import { HubConnection } from "@microsoft/signalr";
import { Action, Reducer } from "redux";
import { TradeDTO } from "../../models/models";
import { AppThunk, RootState } from "../../app/store";
import { setupSignalRConnection } from "../../services/communication/signalRConnection";
import { SIGNALR_PATH } from "../../helpers/constants";
import { authenticatedGet } from "../../services/communication/connectionServices";

export interface ActionsState {
  trades: TradeDTO[];
}

interface OnTradesLoadedAction {
  type: "ON_TRADES_LOADED";
  trades: TradeDTO[];
}

interface OnTradedAddedAction {
  type: "ON_TRADE_ADDED_ACTION";
  trade: TradeDTO;
}

export type KnownAction = OnTradesLoadedAction | OnTradedAddedAction;

export const onTradesLoadedAction = (
  trades: TradeDTO[]
): OnTradesLoadedAction => ({
  type: "ON_TRADES_LOADED",
  trades,
});

export const onTradeAddedAction = (trade: TradeDTO): OnTradedAddedAction => ({
  type: "ON_TRADE_ADDED_ACTION",
  trade,
});

export const actionCreators = {
  onTradesRequested: (profileId: string): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      authenticatedGet<TradeDTO[]>("trades").then((trades: TradeDTO[]) => {
        dispatch(onTradesLoadedAction(trades));
      });
      // const connection = await getActionsConnection(dispatch);
      // connection
      //   .invoke("GetAllTradesByProfileId", profileId)
      //   .then((trades: TradeDTO[]) => {
      //     dispatch(onTradesLoadedAction(trades));
      //   });
    };
  },
  onTradeAdded: (trade: TradeDTO): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      dispatch(onTradeAddedAction(trade));
    };
  },
};

const initialState = {
  trades: [],
} as ActionsState;

export const tradesReducer: Reducer<ActionsState> = (
  state = initialState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ON_TRADES_LOADED":
      return {
        ...state,
        trades: { ...action.trades },
      };
    case "ON_TRADE_ADDED_ACTION":
      return {
        ...state,
        trades: [...state.trades, action.trade],
      };
    default:
      return state;
  }
};

export const { onTradesRequested, onTradeAdded } = actionCreators;

export const selectTrades = (state: RootState) => state.trades;

const connectionHub = `${SIGNALR_PATH}/trades`;

let actionsConnection: HubConnection | undefined = undefined;

export const getActionsConnection = async (dispatch: any) => {
  if (actionsConnection) return actionsConnection;

  actionsConnection = await setupEventsHub(dispatch);
  return actionsConnection;
};

export const setupEventsHub = setupSignalRConnection(connectionHub, {
  OnTradeAdded: onTradeAdded,
});
