export enum TabId {
  Details = 0,
  Wallets = 1,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
]);

export type UserProfileDetails = {
  username: string;
  email: string;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}

export type UpdateProfileDetailsRequest = UserProfileDetails & {
  current_password: string;
  new_password: string;
}
