import { Component } from '@angular/core';
import { tabs } from './profile.config';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { TabId, tabsRouterMap } from './profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected readonly tabs = tabs;

  constructor(
    private readonly router: RouterExtendedService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  onTabIndexSelectionChanged(index: number): void {
    const url = tabsRouterMap.get(index as TabId) ?? [];
    this.router.navigate(url, { relativeTo: this.activatedRoute });
  }

}
