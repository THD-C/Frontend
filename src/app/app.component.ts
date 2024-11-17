import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { appName } from './app.config';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AuthService } from './services/user/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly title = appName;

  constructor(private readonly authService: AuthService) {}

  async securedCall() {
    await this.authService.secured();
  }

}
