import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { appName } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = appName;
}
