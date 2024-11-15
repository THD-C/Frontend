import { User } from '../../../../shared/models/user.model';

export type SignUpRequest = User & {
  /**
   * Password confirm
   */
  confirm: string;
};
