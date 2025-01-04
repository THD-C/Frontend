import { Component, output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../../../../../services/users/users.service';
import { UserType, UserTypes, userTypesLongMapReverse, UserTypeStringLong } from '../../../../../shared/models/user.model';
import { BaseService } from '../../../../../services/base/base.service';
import { UserTypeChanged } from './admin-user-change.model';

@Component({
  selector: 'app-admin-user-change-type',
  templateUrl: './admin-user-change-type.component.html',
  styleUrl: './admin-user-change-type.component.scss'
})
export class AdminUserChangeTypeComponent {

  protected readonly UserTypes = UserTypes;

  onChanged = output<UserTypeChanged>();

  visible = false;

  user_id: string = '0';

  user_type: UserType = UserType.Standard;

  constructor(
    private readonly usersService: UsersService,
    private readonly notifications: NotificationsService,
  ) { }

  open(id: string, current_user_type: UserTypeStringLong): void {
    this.visible = true;
    this.user_id = id;
    this.user_type = userTypesLongMapReverse.get(current_user_type) ?? UserType.Standard;
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
        $localize`:@@admin-user-change-type.User-type-updated-successfully:User type updated successfully`,
        BaseService.notificationOverride
      );

      this.onChanged.emit({
        user_type: this.user_type,
        user_id: this.user_id,
      });
      this.close();
    } catch (e) {
    }
  }

}
