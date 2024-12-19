import { Component } from '@angular/core';
import { appName } from '../../../../app.config';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {

  readonly appName = appName;

  constructor(protected readonly router: RouterExtendedService) { }

}
