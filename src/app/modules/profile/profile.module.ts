import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';

import { routes } from './profile.routes';
import { GridEditButtonDirective } from '../../directives/grid-edit-button/grid-edit-button.directive';
import { GridDeleteButtonDirective } from '../../directives/grid-delete-button/grid-delete-button.directive';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileWalletsComponent } from './components/profile/profile-wallets/profile-wallets.component';
import { ProfileWalletCreateComponent } from './components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { ProfileWalletAddMoneyComponent } from './components/profile/profile-wallets/profile-wallet-add-money/profile-wallet-add-money.component';
import { ProfilePaymentsComponent } from './components/profile/profile-payments/profile-payments.component';
import { ProfileWalletOrdersComponent } from './components/profile/profile-wallets/profile-wallet-orders/profile-wallet-orders.component';
import { ProfileStatistictsComponent } from './components/profile/profile-statisticts/profile-statisticts.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileWalletsComponent,
    ProfileWalletCreateComponent,
    ProfilePasswordComponent,
    ProfileWalletAddMoneyComponent,
    ProfilePaymentsComponent,
    ProfileWalletOrdersComponent,
    ProfileStatistictsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,

    DxTabsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxButtonModule,
    DxScrollViewModule,
    DxDataGridModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxPieChartModule,

    GridEditButtonDirective,
    GridDeleteButtonDirective,
  ]
})
export class ProfileModule { }
