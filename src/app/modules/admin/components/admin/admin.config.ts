import { Item as DxTabsItem } from 'devextreme/ui/tabs';
import { TabId } from './admin.model';

export const tabs: DxTabsItem[] = [
  {
    text: $localize`:@@admin.Users:Users`,
    icon: 'group',
  },
];

export const selectedTabIndex: TabId = TabId.Users;
