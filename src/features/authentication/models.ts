export interface RegisterUserDTO {
  username: string;
  password: string;
  email: string;
  callbackUrl: string;
  senderType: SenderType;
}

export interface LoginUserDTO {
  username: string;
  email: string;
  password: string;
}

export enum SenderType {
  Futbot = 2,
}

export interface LoginResponseDTO {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface Token {
  value: string;
  created: Date;
}

export interface TryLoginDTO {
  accessToken: string;
}

export interface UserState {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
