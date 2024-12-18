import { AfterViewInit, Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { UpdateProfileDetailsRequest } from './profile-details.model';
import { UsersService } from '../../../../../services/users/users.service';
import { BaseService } from '../../../../../services/base/base.service';

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
    name: '',
    surname: '',
    street: '',
    building: '',
    city: '',
    postal_code: '',
    country: ''
  };

  profileDetailsOnLoad: UpdateProfileDetailsRequest = { ...this.profileDetails };

  get isFormValid(): boolean {
    return this.profileDetails.username.length > 0
      && this.profileDetails.email.length > 0
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

  async restore(): Promise<void> {
    await this.getMe();
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      this.notifications.error(
        $localize`:@@profile-details.Error:Error`,
        $localize`:@@profile-details.Can-not-update-profile-details-Missing-data-Check-the-form-and-try-again:Can not update profile details. Missing data. Check the form and try again`,
        BaseService.notificationOverride
      );

      return;
    }

    try {
      await this.usersService.updateProfileDetails(this.profileDetails);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-details.Profile-updated-successfully:Profile updated successfully`,
        BaseService.notificationOverride
      );
    } catch(e) {
    }
  }

  async getMe(): Promise<void> {
    try {
      this.profileDetails = await this.usersService.getMe();
    } catch (e) {
    }
  }

}
