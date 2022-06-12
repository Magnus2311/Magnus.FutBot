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

export enum ConfirmationCodeStatusType {
  Successful,
  WrongCode,
}

export interface ProfileLoginResponseDTO {
  loginStatus: LoginStatusType;
}

export interface ConfirmationCodeResponseDTO {
  status: ConfirmationCodeStatusType;
}
