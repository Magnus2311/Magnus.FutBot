import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { reducer } from "../features/profiles/profileActions";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profiles: reducer,
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
