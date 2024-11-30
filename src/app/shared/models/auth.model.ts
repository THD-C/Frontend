export type AuthScheme = 'Bearer';

export type Session = {
  accessToken: string;
  authScheme: AuthScheme;
  email: string;
  username: string;
}