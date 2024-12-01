export enum TabId {
  Details = 0,
  Wallets = 1,
  Password = 2,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
  [TabId.Password, ['password']],
]);

export const activatedRouteTabsMap: Map<string, TabId> = new Map([
  ['/profile/details', TabId.Details],
  ['/profile/wallets', TabId.Wallets],
  ['/profile/password', TabId.Password],
]);
