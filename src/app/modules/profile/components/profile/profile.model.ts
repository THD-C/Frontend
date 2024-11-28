export enum TabId {
  Details = 0,
  Wallets = 1,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
]);

export type UpdateProfileDetailsRequest = {
  username: string;
  email: string;
  current_password: string;
  new_password: string;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}
