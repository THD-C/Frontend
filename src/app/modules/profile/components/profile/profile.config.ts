import { Item as DxTabsItem } from 'devextreme/ui/tabs';
import { TabId } from './profile.model';

export const tabs: DxTabsItem[] = [
  {
    text: $localize`:@@profile.Details:Details` ,
    icon: 'user',
  },
  {
    text: $localize`:@@profile.Wallets:Wallets`,
    icon: 'folder',
  },
  {
    text: $localize`:@@profile.Password:Password`,
    icon: 'key',
  },
  {
    text: $localize`:@@profile.Payments:Payments`,
    icon: 'money',
  },
  {
    text: $localize`:@@profile.Statistics:Statistics`,
    icon: 'chart',
  },
];

export const selectedTabIndex: TabId = TabId.Details;
