import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { routes } from './register.routes';

import { RegisterComponent } from './components/register/register.component';
import { RegisterAddressComponent } from './components/register/register-address/register-address.component';
import { RegisterPersonalDataComponent } from './components/register/register-personal-data/register-personal-data.component';
import { RegisterCredentialsComponent } from './components/register/register-credentials/register-credentials.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    RegisterComponent,
    RegisterCredentialsComponent,
    RegisterPersonalDataComponent,
    RegisterAddressComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
  ],
})
export class RegisterModule { }
