import { Component, viewChild, ViewChild } from '@angular/core';
import { TextBoxType } from 'devextreme/ui/text_box';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { AuthService } from '../../../../services/user/auth.service';
import { LoginRequest } from './login.model';
import { passwordButtonOptions } from './login.config';
import { ClickEvent } from 'devextreme/ui/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

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

  constructor(private readonly authService: AuthService) {}

  async submit(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
       await this.authService.login(this.loginRequest);
    } catch(e) {
    }
  }
}
