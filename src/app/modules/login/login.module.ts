import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { routes } from './login.routes';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule
  ],
})
export class LoginModule { }
