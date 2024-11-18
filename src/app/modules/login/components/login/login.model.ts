import { Session } from '../../../../shared/models/auth.model';

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = Session;