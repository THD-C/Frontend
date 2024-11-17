import { AuthScheme, Session } from '../../../../shared/models/auth.model';
import { User } from '../../../../shared/models/user.model';

export type RegisterRequest = User;
export type RegisterResponse = Session;
