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

import { routes } from './profile.routes';
import { GridEditButtonDirective } from '../../directives/grid-edit-button/grid-edit-button.directive';
import { GridDeleteButtonDirective } from '../../directives/grid-delete-button/grid-delete-button.directive';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileWalletsComponent } from './components/profile/profile-wallets/profile-wallets.component';
import { ProfileWalletEditComponent } from './components/profile/profile-wallets/profile-wallet-edit/profile-wallet-edit.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { ProfileWalletAddMoneyComponent } from './components/profile/profile-wallets/profile-wallet-add-money/profile-wallet-add-money.component';
import { ProfilePaymentsComponent } from './components/profile/profile-payments/profile-payments.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileWalletsComponent,
    ProfileWalletEditComponent,
    ProfilePasswordComponent,
    ProfileWalletAddMoneyComponent,
    ProfilePaymentsComponent,
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

    GridEditButtonDirective,
    GridDeleteButtonDirective,
  ]
})
export class ProfileModule { }
