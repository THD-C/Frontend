import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { appName } from './app.config';
import { DonateComponent } from './shared/components/donate/donate.component';
import { ThemesService } from './services/themes/themes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule, DonateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  readonly title = appName;

  constructor(private readonly themesService: ThemesService) {}

  ngOnInit(): void {
    this.themesService.loadCached();
  }

}
