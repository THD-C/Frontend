import { AfterViewInit, Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { confirm } from 'devextreme/ui/dialog';

import { Payment, PaymentState, paymentStatesMap } from './profile-payments.model';
import { PaymentsService } from '../../../../../services/payments/payments.service';
import { BaseService } from '../../../../../services/base/base.service';

@Component({
  selector: 'app-profile-payments',
  templateUrl: './profile-payments.component.html',
  styleUrl: './profile-payments.component.scss'
})
export class ProfilePaymentsComponent implements AfterViewInit {

  payments: Payment[] = [];

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly notifications: NotificationsService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.getPayments();
  }

  async getPayments(): Promise<void> {
    try {
      this.payments = await this.paymentsService.get();
    } catch (e) {
    }
  }

  async cancel(id: string): Promise<void> {
    if (
      await confirm(
        $localize`:@@profile-payments.Are-you-sure-you-want-cancel-the-payment:Are you sure you want cancel the payment?`,
        $localize`:@@profile-payments.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      const canceledPayment = await this.paymentsService.cancel(id);
      const index = this.payments.findIndex(p => p.id === id.toString());
      if (index !== -1) {
        this.payments[index] = canceledPayment;
      }

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-payments.Payment-canceled-successfully:Payment canceled successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

  isCancelable(payment: Payment): boolean {
    const state = paymentStatesMap.get(payment.state);
    return state === PaymentState.PAYMENT_STATE_PENDING;
  }

}
