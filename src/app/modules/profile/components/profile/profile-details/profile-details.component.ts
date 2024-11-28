import { Component } from '@angular/core';
import { UpdateProfileDetailsRequest } from '../profile.model';
import { TextBoxType } from 'devextreme/ui/text_box';
import { validatePassword } from '../../../../../shared/validators/password-strength.validator';
import { ValidationCallbackData } from 'devextreme/common';
import { passwordButtonOptions } from './profile-details.config';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
  
  profileDetails: UpdateProfileDetailsRequest = {
    username: '',
    email: '',
    current_password: '',
    new_password: '',
    name: '',
    surname: '',
    street: '',
    building: '',
    city: '',
    postal_code: '',
    country: ''
  };

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

  async submit(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      //await this.userService.(this.profileDetails);
    } catch(e) {
    }
  }

}
