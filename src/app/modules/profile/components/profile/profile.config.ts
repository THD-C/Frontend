import { Item as DxTabsItem } from 'devextreme/ui/tabs';

export const tabs: DxTabsItem[] = [
  {
    text: $localize`:@@profile.Details:Details` ,
    icon: 'user',
  },
  {
    text: $localize`:@@profile.Wallets:Wallets`,
    icon: 'money',
  },
  {
    text: $localize`:@@profile.Credentials:Credentials`,
    icon: 'key',
  },
];
