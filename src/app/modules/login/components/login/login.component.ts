import { AfterViewInit, Component, viewChild } from '@angular/core';
import { TextBoxType } from 'devextreme/ui/text_box';
import { SocialAuthService } from '@abacritt/angularx-social-login';

import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';

import { AuthService } from '../../../../services/auth/auth.service';
import { LoginRequest } from './login.model';
import { passwordButtonOptions } from './login.config';
import { appName } from '../../../../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {

  readonly appName = appName;
  readonly passwordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  passwordMode: TextBoxType = 'password';
  loginRequest: LoginRequest = {
    login: '',
    password: '',
  };
  passwordErrors: string[] = [];

  get isFormValid(): boolean {
    return this.loginRequest.login.length > 0
      && this.loginRequest.password.length > 0;
  }

  txtEmail = viewChild.required<DxTextBoxComponent>('txtEmail');

  constructor(
    private readonly authService: AuthService,
    
    private readonly socialAuthService: SocialAuthService,
  ) {}

  ngAfterViewInit(): void {
    this.txtEmail()?.instance.focus();
    this.socialAuthService.authState.subscribe(async user => {
      if (user.provider.toLowerCase() === 'google') {
        await this.authService.loginWithGoogle(user.idToken)
      }
    });
  }

  async login(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
       await this.authService.login(this.loginRequest);
    } catch(e) {
    }
  }

}
