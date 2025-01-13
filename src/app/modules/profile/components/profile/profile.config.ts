import { Item as DxTabsItem } from 'devextreme/ui/tabs';
import { TabId } from './profile.model';

export const detailsTab: DxTabsItem = {
  text: $localize`:@@profile.Details:Details` ,
  icon: 'user',
};

export const walletsTab: DxTabsItem = {
  text: $localize`:@@profile.Wallets:Wallets`,
  icon: 'folder',
};

export const paymentsTab: DxTabsItem = {
  text: $localize`:@@profile.Payments:Payments`,
  icon: 'money',
};

export const statistictsTab: DxTabsItem = {
  text: $localize`:@@profile.Statistics:Statistics`,
  icon: 'chart',
};

export const passwordTab: DxTabsItem = {
  text: $localize`:@@profile.Password:Password`,
  icon: 'key',
};

export const tabs: DxTabsItem[] = [
  detailsTab,
  walletsTab,
  paymentsTab,
  statistictsTab,
  passwordTab,
];

export const selectedTabIndex: TabId = TabId.Details;
