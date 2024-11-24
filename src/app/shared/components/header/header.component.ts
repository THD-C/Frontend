import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { appName } from '../../../app.config';
import { AuthService } from '../../../services/auth/auth.service';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ButtonType } from 'devextreme/ui/button';
import { RouterExtendedService } from '../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule, DxButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly appName = appName;

  protected btnCollapseProfileType: ButtonType = 'normal';

  constructor(
    protected readonly authService: AuthService,
    private readonly router: RouterExtendedService,
  ) {
    if (this.router.url.startsWith('/profile')) {
      this.btnCollapseProfileType = 'default';
    }
  }
}
