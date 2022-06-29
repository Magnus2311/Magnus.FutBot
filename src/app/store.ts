import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as profilesReducer } from "../features/profiles/profileActions";
import { reducer as playersReducer } from "../features/players/playersActions";

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    players: playersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<ActionType>
>;
