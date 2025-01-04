import { UserType } from '../../../../../shared/models/user.model';

export type UserTypeChanged = {
  user_id: string;
  user_type: UserType;
}
