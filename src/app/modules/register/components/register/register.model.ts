import { Session } from '../../../../shared/models/auth.model';

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
}
export type RegisterResponse = Session;
