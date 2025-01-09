export enum TabId {
  Details = 0,
  Wallets = 1,
  Password = 2,
  Payments = 3,
  Statistics = 4,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
  [TabId.Password, ['password']],
  [TabId.Payments, ['payments']],
  [TabId.Statistics, ['statisticts']],
]);

export const activatedRouteTabsMap: Map<string, TabId> = new Map([
  ['/profile/details', TabId.Details],
  ['/profile/wallets', TabId.Wallets],
  ['/profile/password', TabId.Password],
  ['/profile/payments', TabId.Payments],
  ['/profile/statisticts', TabId.Statistics],
]);
