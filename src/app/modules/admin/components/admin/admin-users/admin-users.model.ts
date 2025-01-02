export type ManageUser = {
  ID: string;
  email: string;
  username: string;

  /**
   * Based on {@link UserType} in {@link UserTypeString} primitive values
   */
  user_type: string;
}

export type GetUsersListResponse = {
  user_data: ManageUser[];
}
