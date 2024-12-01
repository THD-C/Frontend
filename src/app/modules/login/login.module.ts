import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { routes } from './login.routes';
import { LoginComponent } from './components/login/login.component';
import { environment } from '../../../environments/environment';


const googleAuthService: Provider = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          environment.google.clientId,
          {
            scopes: environment.google.scopes
          }
        ),
      },
    ],
  } as SocialAuthServiceConfig,
}

@NgModule({
  providers: [
    provideRouter(routes),
    googleAuthService,
  ],
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,

    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
  ],
})
export class LoginModule { }
