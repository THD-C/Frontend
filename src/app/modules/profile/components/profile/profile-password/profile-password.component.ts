import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { TextBoxType } from 'devextreme/ui/text_box';
import { ValidationCallbackData } from 'devextreme/common';

import { UsersService } from '../../../../../services/users/users.service';

import { validatePassword } from '../../../../../shared/validators/password-strength.validator';
import { UpdateUserPasswordRequest } from './profile-password.model';
import { passwordButtonOptions } from './profile-password.config';
import { BaseService } from '../../../../../services/base/base.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.scss'
})
export class ProfilePasswordComponent {
  
  userPassword: UpdateUserPasswordRequest = {
    old_password: '',
    new_password: '',
  };

  protected readonly oldPasswordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.oldPasswordMode = this.oldPasswordMode === 'text' ? 'password' : 'text';
    },
  };

  protected readonly newPasswordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.newPasswordMode = this.newPasswordMode === 'text' ? 'password' : 'text';
    },
  };

  protected oldPasswordMode: TextBoxType = 'password';
  protected newPasswordMode: TextBoxType = 'password';
  protected passwordErrors: string[] = [];

  protected get showPasswordErrors(): boolean {
    return this.passwordErrors.length > 0;
  }

  get isFormValid(): boolean {
    return this.userPassword.old_password.length > 0 && this.passwordErrors.length === 0;
  }

  constructor(
    private readonly notifications: NotificationsService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  protected validateNewPassword(callbackData: ValidationCallbackData): boolean {
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  async change(): Promise<void> {
    if (this.isFormValid === false) {
      this.notifications.error(
        $localize`:@@profile-password.Error:Error`,
        $localize`:@@profile-password.Can-not-change-password-Missing-data-Check-the-form-and-try-again:Can not change password. Missing data. Check the form and try again`,
        BaseService.notificationOverride
      );

      return;
    }

    try {
      await this.usersService.updatePassword(this.userPassword);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-password.Password-changed-successfully-Please-login-again:Password changed successfully. Please login again`,
        BaseService.notificationOverride
      );

      this.authService.logout(true);
    } catch(e) {
    }
  }

}
