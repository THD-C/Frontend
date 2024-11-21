import { Component } from '@angular/core';
import { appName } from '../../../../app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly appName = appName;
  
}
