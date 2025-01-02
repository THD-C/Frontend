export enum TabId {
  Users = 0,
}

export const tabsRouterMap: Map<number, string[]> = new Map([
  [TabId.Users, ['users']],
]);

export const activatedRouteTabsMap: Map<string, TabId> = new Map([
  ['/admin/users', TabId.Users],
]);
