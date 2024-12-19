export enum TabId {
  Details = 0,
  Wallets = 1,
  Password = 2,
  Payments = 3,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
  [TabId.Password, ['password']],
  [TabId.Payments, ['payments']],
]);

export const activatedRouteTabsMap: Map<string, TabId> = new Map([
  ['/profile/details', TabId.Details],
  ['/profile/wallets', TabId.Wallets],
  ['/profile/password', TabId.Password],
  ['/profile/payments', TabId.Payments],
]);
