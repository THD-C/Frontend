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
  /**
   * {@link UserType.Standard}
   */
  Standard = 'STANDARD_USER',

  /**
   * {@link UserType.Blogger}
   */
  Blogger = 'BLOGGER_USER',

  /**
   * {@link UserType.Admin}
   */
  Admin = 'ADMIN_USER',
}

export enum UserTypeStringLong {
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
  Admin = 'USER_TYPE_ADMIN_USER',
}

export type AvailableUserType = {
  value: UserType;
  text: UserTypeString;
}

export const userTypesMap: Map<UserType, UserTypeString> = new Map([
  [UserType.Standard, UserTypeString.Standard],
  [UserType.Blogger, UserTypeString.Blogger],
  [UserType.Admin, UserTypeString.Admin],
]);

export const userTypesMapReverse: Map<UserTypeString, UserType> = new Map(
  Array.from(userTypesMap, ([key, value]) => [value, key])
);

export const userTypesLongMap: Map<UserType, UserTypeStringLong> = new Map([
  [UserType.Standard, UserTypeStringLong.Standard],
  [UserType.Blogger, UserTypeStringLong.Blogger],
  [UserType.Admin, UserTypeStringLong.Admin],
]);

export const userTypesLongMapReverse: Map<UserTypeStringLong, UserType> = new Map(
  Array.from(userTypesLongMap, ([key, value]) => [value, key])
);

export const UserTypes: AvailableUserType[] = Array.from(userTypesMap, ([key, value]) => ({ value: key, text: value }));
