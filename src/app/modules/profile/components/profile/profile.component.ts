import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectedTabIndex, tabs, passwordTab, detailsTab, walletsTab, paymentsTab, statistictsTab } from './profile.config';
import { activatedRouteTabsMap, TabId, tabsRouterMap } from './profile.model';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {

  selectedTabIndex = selectedTabIndex;
  protected tabs = tabs;

  constructor(
    private readonly router: RouterExtendedService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
  ) { }

  ngAfterViewInit(): void {
    if (this.authService.session?.oauthLogin) {
      this.tabs = [
        detailsTab,
        walletsTab,
        paymentsTab,
        statistictsTab,
      ];
    }

    passwordTab.visible = this.authService.session?.oauthLogin;
    const tabId = activatedRouteTabsMap.get(this.router.url);
    this.selectedTabIndex = tabId as number;
  }

  onTabIndexSelectionChanged(index: number): void {
    const url = tabsRouterMap.get(index as TabId) ?? [];
    this.router.navigate(url, { relativeTo: this.activatedRoute });
  }

}
