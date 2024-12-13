export interface RefreshTokenResponse {
  status: string;
  uuid: string;
}

export interface SignInResponse {
  status: string;
  message?: string;
}

export type Environments = "local";

export interface Config {
  api: string;
}
