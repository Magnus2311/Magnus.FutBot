import { Action, Reducer } from "redux";
import { AppThunk, RootState } from "../../app/store";
import { SIGNALR_PATH } from "../../helpers/constants";
import {
  ConfirmationCodeStatusType,
  LoginStatusType,
  ProfileDTO,
  ProfileLoginResponseDTO,
} from "../../models/models";
import * as profileApi from "./profileApi";
import { setupSignalRConnection } from "./profileSignalR";

export interface ProfilesState {
  profiles: ProfileDTO[];
  status:
    | "idle"
    | "pending"
    | "wrong-credentials"
    | "confirmation-key-required"
    | "unknown-error"
    | "successfully-added"
    | "confirmation-code-successful"
    | "wrong-confirmation-code";
}

interface AddProfileAction {
  type: "ADD_PROFILE";
  profile: ProfileDTO;
}

interface GetAllProfilesAction {
  type: "GET_ALL_PROFILES";
  profiles: ProfileDTO[];
}

interface WrongCredentialsAction {
  type: "WRONG_CREDENTIALS_ON_PROFILE_CREATION";
}

interface ConfirmationKeyRequiredAction {
  type: "CONFIRMATION_KEY_REQUIRED_ACTION";
}

interface UnknownErrorAction {
  type: "UNKNOWN_ERROR_ACTION";
}

interface PendingAction {
  type: "PENDING_ACTION";
}

interface ConfirmationCodeSuccessfulAction {
  type: "CONFIRMATION_CODE_SUCCESSFUL_ACTION";
  profile: ProfileDTO;
}

interface WrongConfirmationCodeAction {
  type: "WRONG_CONFIRMATION_CODE_ACTION";
}

export type KnownAction =
  | AddProfileAction
  | GetAllProfilesAction
  | WrongCredentialsAction
  | ConfirmationKeyRequiredAction
  | UnknownErrorAction
  | PendingAction
  | ConfirmationCodeSuccessfulAction
  | WrongConfirmationCodeAction;

export const addProfileAction = (profile: ProfileDTO): AddProfileAction => ({
  type: "ADD_PROFILE",
  profile,
});

export const getAllProfilesAction = (
  profiles: ProfileDTO[]
): GetAllProfilesAction => ({
  type: "GET_ALL_PROFILES",
  profiles,
});

export const wrongCredentialsAction = (): WrongCredentialsAction => ({
  type: "WRONG_CREDENTIALS_ON_PROFILE_CREATION",
});

export const confirmationKeyRequiredAction =
  (): ConfirmationKeyRequiredAction => ({
    type: "CONFIRMATION_KEY_REQUIRED_ACTION",
  });

export const unknownErrorAction = (): UnknownErrorAction => ({
  type: "UNKNOWN_ERROR_ACTION",
});

export const confirmationCodeSuccessfulAction = (
  profile: ProfileDTO
): ConfirmationCodeSuccessfulAction => ({
  type: "CONFIRMATION_CODE_SUCCESSFUL_ACTION",
  profile,
});

export const wrongConfirmationCodeAction = (): WrongConfirmationCodeAction => ({
  type: "WRONG_CONFIRMATION_CODE_ACTION",
});

export const pendingAction = (): PendingAction => ({ type: "PENDING_ACTION" });

export const actionCreators = {
  addProfile: (profile: ProfileDTO): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      dispatch(pendingAction());
      const response = await profileApi.addProfile(profile);
      if (response.loginStatus === LoginStatusType.Successful)
        dispatch(addProfileAction(profile));
      else if (response.loginStatus === LoginStatusType.WrongCredentials)
        dispatch(wrongCredentialsAction());
      else if (response.loginStatus === LoginStatusType.ConfirmationKeyRequired)
        dispatch(confirmationKeyRequiredAction());
      else dispatch(unknownErrorAction());
    };
  },
  getAllProfiles: (): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      const response = await profileApi.getProfiles();
      dispatch(getAllProfilesAction(response));
    };
  },
  sendConfirmationCode: (
    profile: ProfileDTO,
    code: string
  ): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      dispatch(pendingAction());
      const response = await profileApi.sendConfirmationCode(profile, code);
      if (response.status === ConfirmationCodeStatusType.Successful)
        dispatch(addProfileAction(profile));
      if (response.status === ConfirmationCodeStatusType.WrongCode)
        dispatch(wrongConfirmationCodeAction());
    };
  },
  onProfileAdded: (
    loginResponse: ProfileLoginResponseDTO
  ): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      if (loginResponse.loginStatus === LoginStatusType.Successful)
        dispatch(addProfileAction(loginResponse.profile));
      else if (loginResponse.loginStatus === LoginStatusType.WrongCredentials)
        dispatch(wrongCredentialsAction());
      else if (
        loginResponse.loginStatus === LoginStatusType.ConfirmationKeyRequired
      )
        dispatch(confirmationKeyRequiredAction());
      else dispatch(unknownErrorAction());
    };
  },
};

const initialState = {
  profiles: [],
  status: "idle",
} as ProfilesState;

export const reducer: Reducer<ProfilesState> = (
  state = initialState,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ADD_PROFILE":
      return {
        ...state,
        profiles: [...state.profiles, action.profile],
        status: "successfully-added",
      };
    case "CONFIRMATION_KEY_REQUIRED_ACTION":
      return { ...state, status: "confirmation-key-required" };
    case "GET_ALL_PROFILES":
      return { ...state, profiles: [...action.profiles] };
    case "UNKNOWN_ERROR_ACTION":
      return { ...state, status: "unknown-error" };
    case "WRONG_CREDENTIALS_ON_PROFILE_CREATION":
      return { ...state, status: "wrong-credentials" };
    case "PENDING_ACTION":
      return { ...state, status: "pending" };
    case "WRONG_CONFIRMATION_CODE_ACTION":
      return {
        ...state,
        status: "wrong-confirmation-code",
      };
    default:
      return state;
  }
};

export const {
  addProfile,
  getAllProfiles,
  sendConfirmationCode,
  onProfileAdded,
} = actionCreators;

export const selectProfiles = (state: RootState) => state.profiles;

const connectionHub = `${SIGNALR_PATH}/profiles`;

export const setupEventsHub = setupSignalRConnection(connectionHub, {
  AddProfile: addProfile,
  GetAllProfiles: getAllProfiles,
  SendConfirmationCode: sendConfirmationCode,
  OnProfileAdded: onProfileAdded,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (dispatch: any) => {
  dispatch(setupEventsHub); // dispatch is coming from Redux
};
