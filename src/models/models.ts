export interface AddProfileDTO {
  email: string;
  password: string;
}

export interface ProfileDTO {
  email: string;
  coins: number;
  status: LoginStatusType;
  activeBidsCount: number;
  wonTargetsCount: number;
  transferListCount: number;
  unassignedCount: number;
  outbidded: number;
}

export enum LoginStatusType {
  Successful,
  WrongCredentials,
  ConfirmationKeyRequired,
  UnknownError,
}

export enum ConfirmationCodeStatusType {
  Successful,
  WrongCode,
}

export interface ProfileLoginResponseDTO {
  loginStatus: LoginStatusType;
  profile: ProfileDTO;
}

export interface ConfirmationCodeResponseDTO {
  status: ConfirmationCodeStatusType;
  email: ProfileDTO;
}

export interface Player {
  id: number;
  rating: number;
  name: string;
}
