import { Component } from '@angular/core';
import { UpdateProfileDetailsRequest } from '../profile.model';
import { TextBoxType } from 'devextreme/ui/text_box';
import { validatePassword } from '../../../../../shared/validators/password-strength.validator';
import { ValidationCallbackData } from 'devextreme/common';
import { passwordButtonOptions } from './profile-details.config';
import { NotificationsService } from 'angular2-notifications';

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
    return this.profileDetails.username.length > 0
      && this.profileDetails.email.length > 0
      && (
        (
          this.profileDetails.current_password.length === 0
          && this.profileDetails.new_password.length === 0
        ) || validatePassword(this.profileDetails.new_password)
      )
      && this.profileDetails.name.length > 0
      && this.profileDetails.surname.length > 0
      && this.profileDetails.street.length > 0
      && this.profileDetails.building.length > 0
      && this.profileDetails.city.length > 0
      && this.profileDetails.postal_code.length > 0
      && this.profileDetails.country.length > 0;
  }

  constructor(private readonly notifications: NotificationsService) { }

  protected validateNewPassword(callbackData: ValidationCallbackData): boolean {
    if (callbackData.value.length === 0) {
      return true;
    }
    
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  async submit(): Promise<void> {
    if (this.isFormValid === false) {
      this.notifications.error(
        $localize`:@@profile-details.Error:Error`,
        $localize`:@@profile-details.Missing-form-data-Fill-the-form:Missing form data. Fill the form`,
      );

      return;
    }

    try {
      //await this.userService.(this.profileDetails);
    } catch(e) {
    }
  }

}
