import { Component } from '@angular/core';
import { appName } from '../../../../app.config';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrl: './payment-fail.component.scss'
})
export class PaymentFailComponent {

  readonly appName = appName;

  constructor(protected readonly router: RouterExtendedService) { }

}
