import { AfterViewInit, Component, input, viewChild } from '@angular/core';

import { ValidationCallbackData } from 'devextreme/common';
import { TextBoxType } from 'devextreme/ui/text_box';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';

import { AuthService } from '../../../../services/user/auth.service';
import { validatePassword } from '../../../../shared/validators/password-strength.validator';
import { passwordButtonOptions } from './register.config';
import { appName } from '../../../../app.config';
import { RegisterRequest } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {
  
  protected readonly appName = appName;
  protected readonly passwordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  protected passwordMode: TextBoxType = 'password';
  protected passwordErrors: string[] = [];

  private txtEmail = viewChild.required<DxTextBoxComponent>('txtEmail');
  private txtUsername = viewChild.required<DxTextBoxComponent>('txtUsername');

  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    street: '',
    building: '',
    city: '',
    postal_code: '',
    country: ''
  };

  protected get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return this.registerRequest.username.length > 0
      && this.txtEmail().isValid
      && validatePassword(this.registerRequest.password).length === 0;
  }

  constructor(private readonly authService: AuthService) {}

  ngAfterViewInit(): void {
    this.txtUsername()?.instance.focus();
  }

  protected validatePassword(callbackData: ValidationCallbackData): boolean {
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
