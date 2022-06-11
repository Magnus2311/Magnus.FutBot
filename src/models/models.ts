export interface ProfileDTO {
  email: string;
  password: string;
}

export enum LoginStatusType {
  Successful,
  WrongCredentials,
  ConfirmationKeyRequired,
  UnknownError,
}

export interface ProfileLoginResponseDTO {
  loginStatus: LoginStatusType;
}
