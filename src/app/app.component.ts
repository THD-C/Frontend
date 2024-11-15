import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { appName } from './app.config';
import { SimpleNotificationsModule } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = appName;
}
