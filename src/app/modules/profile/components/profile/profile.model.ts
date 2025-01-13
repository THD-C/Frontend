export enum TabId {
  Details = 0,
  Wallets,
  Payments,
  Statistics,
  Password,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
  [TabId.Payments, ['payments']],
  [TabId.Statistics, ['statisticts']],
  [TabId.Password, ['password']],
]);

export const activatedRouteTabsMap: Map<string, TabId> = new Map([
  ['/profile/details', TabId.Details],
  ['/profile/wallets', TabId.Wallets],
  ['/profile/payments', TabId.Payments],
  ['/profile/statisticts', TabId.Statistics],
  ['/profile/password', TabId.Password],
]);
