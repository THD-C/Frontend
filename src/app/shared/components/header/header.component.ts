import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ButtonType } from 'devextreme/ui/button';

import { appName, availableLanguages, Language } from '../../../app.config';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterExtendedService } from '../../../services/router-extended/router-extended.service';
import { Position } from './header.model';
import { ThemesService } from '../../../services/themes/themes.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule, DxButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  get themeButtonIcon(): string {
    return this.themesService.isDark ? 'moon' : 'sun';
  }

  position = input<Position>('fixed');

  languages: Language[] = availableLanguages.sort((a, b) => a.name.localeCompare(b.name) ? 1 : -1);

  protected readonly appName = appName;

  protected btnCollapseProfileType: ButtonType = 'normal';

  constructor(
    protected readonly authService: AuthService,
    protected readonly router: RouterExtendedService,
    protected readonly themesService: ThemesService,
  ) {
    if (this.router.url.includes('/profile')) {
      this.btnCollapseProfileType = 'default';
    }
  }

}
