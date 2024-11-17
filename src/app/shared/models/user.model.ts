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
