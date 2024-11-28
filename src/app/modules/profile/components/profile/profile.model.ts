export enum TabId {
  Details = 0,
  Wallets = 1,
  Credentials = 2,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Details, ['details']],
  [TabId.Wallets, ['wallets']],
  [TabId.Credentials, ['credentials']],
]);
