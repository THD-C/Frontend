import { AuthScheme } from '../../../../shared/models/auth-scheme.model';
import { User } from '../../../../shared/models/user.model';

export type RegisterRequest = User;
export type RegisterResponse = {
  accessToken: string;
  authScheme: AuthScheme;
  email: string;
  username: string;
  id: number;
}
