import { Component } from '@angular/core';
import { TextBoxType } from 'devextreme/ui/text_box';
import { AuthService } from '../../../../services/user/auth.service';
import { LoginRequest } from './login.model';
import { passwordButtonOptions } from './login.config';

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
    email: '',
    password: '',
  };
  passwordErrors: string[] = [];

  constructor(private readonly authService: AuthService) {}

  async submit(): Promise<void> {
    try {
       await this.authService.login(this.loginRequest);
    } catch(e) {
    }
  }
}
