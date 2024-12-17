import { Component } from '@angular/core';
import { appName, supportEmail } from '../../../../app.config';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  
  protected readonly supportEmail = supportEmail;
  protected readonly appName = appName;

}
