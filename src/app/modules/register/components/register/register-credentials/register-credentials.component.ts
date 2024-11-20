import { AfterViewInit, Component, input, output, signal, viewChild } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/common';
import { TextBoxType } from 'devextreme/ui/text_box';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';

import { RegisterRequest } from '../register.model';
import { passwordButtonOptions } from './register-credentials.config';

import { validatePassword } from '../../../../../shared/validators/password-strength.validator';


@Component({
  selector: 'app-register-credentials',
  templateUrl: './register-credentials.component.html',
  styleUrl: './register-credentials.component.scss'
})
export class RegisterCredentialsComponent implements AfterViewInit {

  registerRequest = input.required<RegisterRequest>();
  onNextStepClicked = output<void>();

  protected readonly passwordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  protected passwordMode: TextBoxType = 'password';
  protected passwordErrors: string[] = [];

  protected get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return this.registerRequest().username.length > 0
      && this.txtEmail().isValid
      && validatePassword(this.registerRequest().password).length === 0;
  }

  private txtEmail = viewChild.required<DxTextBoxComponent>('txtEmail');
  private txtUsername = viewChild<DxTextBoxComponent>('txtUsername');

  ngAfterViewInit(): void {
    this.txtUsername()?.instance.focus();
  }

  protected validatePassword(callbackData: ValidationCallbackData): boolean {
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  protected goNextStep(): void {
    if (this.isFormValid === false) {
      return;
    }

    this.onNextStepClicked.emit();
  }
  
}
