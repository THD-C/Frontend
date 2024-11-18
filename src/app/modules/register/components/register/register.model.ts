import { Session } from '../../../../shared/models/auth.model';

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}
export type RegisterResponse = Session;
