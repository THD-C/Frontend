import { Session } from '../../../../shared/models/auth.model';

export type LoginRequest = {
  login: string;
  password: string;
}

export type LoginResponse = Session;