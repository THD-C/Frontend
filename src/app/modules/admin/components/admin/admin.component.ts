import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { selectedTabIndex, tabs } from './admin.config';
import { activatedRouteTabsMap, TabId, tabsRouterMap } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements AfterViewInit {

  selectedTabIndex = selectedTabIndex;
  protected readonly tabs = tabs;

  constructor(
    private readonly router: RouterExtendedService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    const tabId = activatedRouteTabsMap.get(this.router.url);
    this.selectedTabIndex = tabId as number;
  }

  onTabIndexSelectionChanged(index: number): void {
    const url = tabsRouterMap.get(index as TabId) ?? [];
    this.router.navigate(url, { relativeTo: this.activatedRoute });
  }
  
}
