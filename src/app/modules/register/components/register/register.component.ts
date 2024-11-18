import { Component, ViewChild } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/common';
import { TextBoxType } from 'devextreme/ui/text_box';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';

import { RegisterRequest } from './register.model';
import { passwordButtonOptions } from './register.config';

import { validatePassword } from '../../../../shared/validators/password-strength.validator';
import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly passwordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  passwordMode: TextBoxType = 'password';
  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: '',
  };
  passwordErrors: string[] = [];

  get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return this.registerRequest.username.length > 0
      && this.txtEmail.isValid
      && validatePassword(this.registerRequest.password).length === 0;
  }

  @ViewChild('txtEmail') txtEmail!: DxTextBoxComponent;

  constructor(private readonly authService: AuthService) {}

  validatePassword(callbackData: ValidationCallbackData): boolean {
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  async submit(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      await this.authService.register(this.registerRequest);
    } catch(e) {

    }
  }

}
