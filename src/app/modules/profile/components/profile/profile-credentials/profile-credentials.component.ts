import { Component } from '@angular/core';
import { TextBoxType } from 'devextreme/ui/text_box';
import { ValidationCallbackData } from 'devextreme/common';
import { passwordButtonOptions } from './profile-credentials.config';
import { validatePassword } from '../../../../../shared/validators/password-strength.validator';

@Component({
  selector: 'app-profile-credentials',
  templateUrl: './profile-credentials.component.html',
  styleUrl: './profile-credentials.component.scss'
})
export class ProfileCredentialsComponent {

  protected readonly currentPasswordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.currentPasswordMode = this.currentPasswordMode === 'text' ? 'password' : 'text';
    },
  };

  protected readonly newPasswordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.newPasswordMode = this.newPasswordMode === 'text' ? 'password' : 'text';
    },
  };

  protected currentPasswordMode: TextBoxType = 'password';
  protected newPasswordMode: TextBoxType = 'password';
  protected passwordErrors: string[] = [];

  protected get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return true;
    //return validatePassword(this.registerRequest.password).length === 0;
  }

  protected validatePassword(callbackData: ValidationCallbackData): boolean {
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }
  
}
