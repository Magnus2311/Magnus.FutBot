export interface AddProfileDTO {
  email: string;
  password: string;
}

export interface ProfileDTO {
  id: string;
  email: string;
  coins: number;
  status: LoginStatusType;
  activeBidsCount: number;
  wonTargetsCount: number;
  transferListCount: number;
  unassignedCount: number;
  outbidded: number;
  tradePile: TradePile;
}

export interface TradePile {
  transferList: PlayerCard[];
  unassignedItems: PlayerCard[];
  transferTargets: PlayerCard[];
  clubItems: PlayerCard[];
}

export interface PlayerCard {
  name: string;
  rating: number;
  playerCardStatus: PlayerCardStatus;
  playerType: PlayerCardType;
}

export enum LoginStatusType {
  Successful,
  WrongCredentials,
  ConfirmationKeyRequired,
  CaptchaNeeded,
  AlreadyAdded,
  UnknownError,
}

export enum ConfirmationCodeStatusType {
  Successful,
  WrongCode,
}

export enum PlayerCardStatus {
  Pending,
  Won,
  Outbidded,
}

export enum PlayerCardType {
  Bronze,
  Silver,
  Gold,
  TOTW,
  // New types should be added
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
