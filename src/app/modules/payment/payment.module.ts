import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { routes } from './payment.routes';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailComponent } from './components/payment-fail/payment-fail.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    PaymentSuccessComponent,
    PaymentFailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    DxButtonModule,
  ],
})
export class PaymentModule { }
