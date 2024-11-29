import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectedTabIndex, tabs } from './profile.config';
import { activatedRouteTabsMap, TabId, tabsRouterMap } from './profile.model';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {

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
