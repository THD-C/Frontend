import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { appName } from './app.config';
import { DonateComponent } from "./shared/components/donate/donate.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule, DonateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly title = appName;

}
