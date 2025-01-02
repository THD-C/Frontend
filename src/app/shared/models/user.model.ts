export type User = {
  /**
   * Unique across app
   */
  id: number;

  /**
   * Unique across app
   */
  username: string;

  /**
   * Unique across app
   */
  email: string;
  password: string;

  /**
   * {@link UserDetail.id}
   */
  user_detail_id: number;
}

export type UserDetail = {
  id: number;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}

/**
 * List of user types in the system
 */
export enum UserType {
  Unknown = 0,

  /**
   * Standard user register by himself
   */
  Standard = 1,

  /**
   * Can create, edit & delete blog posts
   */
  Blogger = 2,

  /**
   * Anything that {@link UserType.Blogger} can do
   * & manages other users' priviliges - grants/dismisses
   */
  Admin = 3,
}

export enum UserTypeString {
  Unknown = 'USER_TYPE_UNKNOWN_USER',

  /**
   * {@link UserType.Standard}
   */
  Standard = 'USER_TYPE_STANDARD_USER',

  /**
   * {@link UserType.Blogger}
   */
  Blogger = 'USER_TYPE_BLOGGER_USER',

  /**
   * {@link UserType.Admin}
   */
  Admin = 'USER_TYPE_SUPER_ADMIN_USER',
}
