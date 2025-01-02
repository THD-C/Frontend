import { UserType } from "./user.model";

export type AuthScheme = 'Bearer';

export type Session = {
  accessToken: string;
  authScheme: AuthScheme;
  email: string;
  username: string;
}

export type JwtPayload = {
  id: string;
  email: string;
  login: string;
  user_type: UserType;
  iat: number;
  exp: number;
}
