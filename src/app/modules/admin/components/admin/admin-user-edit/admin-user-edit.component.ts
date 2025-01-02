import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../../../../../services/users/users.service';
import { UserType, UserTypes, userTypesMapReverse, UserTypeString } from '../../../../../shared/models/user.model';
import { BaseService } from '../../../../../services/base/base.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrl: './admin-user-edit.component.scss'
})
export class AdminUserEditComponent {

  protected readonly UserTypes = UserTypes;

  visible = false;

  user_id: string = '0';

  user_type: UserType = UserType.Standard;

  constructor(
    private readonly usersService: UsersService,
    private readonly notifications: NotificationsService,
  ) { }

  open(id: string, current_user_type: UserTypeString): void {
    this.visible = true;
    this.user_id = id;
    this.user_type = userTypesMapReverse.get(current_user_type) ?? UserType.Standard;
  }

  close(): void {
    this.visible = false;
    this.user_id = '0';
    this.user_type = UserType.Standard;
  }

  async change(): Promise<void> {
    try {
      await this.usersService.changeUserType(this.user_type, this.user_id);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@admin-user-edit.User-type-updated-successfully:User type updated successfully`,
        BaseService.notificationOverride
      );
      this.close();
    } catch (e) {
    }
  }

}
