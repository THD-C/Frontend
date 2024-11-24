import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { appName } from '../../../app.config';
import { AuthService } from '../../../services/auth/auth.service';

import { DxButtonModule } from 'devextreme-angular/ui/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule, DxButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly appName = appName;

  constructor(protected readonly authService: AuthService) { }
}
