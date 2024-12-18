import { Component } from '@angular/core';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';

import { NotificationsService } from 'angular2-notifications';

import { RouterExtendedService } from '../../../services/router-extended/router-extended.service';
import { AuthService } from '../../../services/auth/auth.service';
import { PaymentsService } from '../../../services/payments/payments.service';
import { BaseService } from '../../../services/base/base.service';
import { currencies, defaultMakePaymentRequest } from './donate.config';
import { MakePaymentRequest } from '../../../modules/profile/components/profile/profile-payments/profile-payments.model';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [DxButtonModule, DxPopupModule, DxValidatorModule, DxNumberBoxModule, DxSelectBoxModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {

  protected readonly currencies = currencies;

  visible: boolean = false;
  makePaymentRequest: MakePaymentRequest = defaultMakePaymentRequest;

  constructor(
    private readonly router: RouterExtendedService,
    private readonly authService: AuthService,
    private readonly paymentsService: PaymentsService,
    private readonly notifications: NotificationsService,
  ) { }

  async donate(): Promise<void> {
    try {
      const response = await this.paymentsService.makePayment(this.makePaymentRequest);
      this.router.openInNewTab(response.session_url);
    } catch (e) {
    }
  }

  open(): void {
    if (this.authService.isAuthenticated === false) {
      this.notifications.info(
        $localize`:@@donate.Info:Info`,
        $localize`:@@donate.In-order-to-donate-log-in-first:In order to donate log in first`,
        BaseService.notificationOverride
      );
      this.router.navigateToLogin(this.router.previousUrl);

      return;
    }

    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.makePaymentRequest = defaultMakePaymentRequest;
  }

}
