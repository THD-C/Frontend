import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { routes } from './register.routes';

import { RegisterComponent } from './components/register/register.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    DxFormModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
  ],
})
export class RegisterModule { }
