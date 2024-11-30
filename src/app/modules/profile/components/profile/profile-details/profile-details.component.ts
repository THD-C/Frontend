import { AfterViewInit, Component } from '@angular/core';
import { UpdateProfileDetailsRequest } from '../profile.model';
import { TextBoxType } from 'devextreme/ui/text_box';
import { validatePassword } from '../../../../../shared/validators/password-strength.validator';
import { ValidationCallbackData } from 'devextreme/common';
import { passwordButtonOptions } from './profile-details.config';
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../../../../../services/users/users.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent implements AfterViewInit {
  
  profileDetails: UpdateProfileDetailsRequest = {
    id: '',
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

  profileDetailsOnLoad: UpdateProfileDetailsRequest = { ...this.profileDetails };

  protected readonly newPasswordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.newPasswordMode = this.newPasswordMode === 'text' ? 'password' : 'text';
    },
  };

  protected newPasswordMode: TextBoxType = 'password';
  protected passwordErrors: string[] = [];

  protected get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return this.profileDetails.username.length > 0
      && this.profileDetails.email.length > 0
      && (
        this.profileDetails.password.length === 0
        || validatePassword(this.profileDetails.password)
      )
      && this.profileDetails.name.length > 0
      && this.profileDetails.surname.length > 0
      && this.profileDetails.street.length > 0
      && this.profileDetails.building.length > 0
      && this.profileDetails.city.length > 0
      && this.profileDetails.postal_code.length > 0
      && this.profileDetails.country.length > 0;
  }

  constructor(
    private readonly notifications: NotificationsService,
    private readonly usersService: UsersService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.getMe();
  }

  protected validateNewPassword(callbackData: ValidationCallbackData): boolean {
    if (callbackData.value.length === 0) {
      return true;
    }
    
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  async restore(): Promise<void> {
    await this.getMe();
    this.passwordErrors = [];
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      this.notifications.error(
        $localize`:@@profile-details.Error:Error`,
        $localize`:@@profile-details.Can-not-update-profile-details-Missing-data-Check-the-form-and-try-again:Can not update profile details. Missing data. Check the form and try again`,
      );

      return;
    }

    try {
      await this.usersService.updateProfileDetails(this.profileDetails);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-details.Profile-updated-successfully:Profile updated successfully`
      );
    } catch(e) {
    }
  }

  async getMe(): Promise<void> {
    try {
      this.profileDetails = {
        ...await this.usersService.getMe(),
        password: '',
      };
    } catch (e) {
    }
  }

}
