import { Component, OnInit, viewChild } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';

import { UsersService } from '../../../../../services/users/users.service';
import { User as User } from './admin-users.model';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserType, userTypesLongMap, UserTypeString, UserTypeStringLong } from '../../../../../shared/models/user.model';
import { AdminUserChangeTypeComponent } from '../admin-user-change-type/admin-user-change-type.component';
import { UserTypeChanged } from '../admin-user-change-type/admin-user-change.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  protected readonly UserType = UserType;

  adminUserEdit = viewChild.required<AdminUserChangeTypeComponent>('adminUserEdit');

  users: User[] = [];
  
  constructor(
    private readonly usersService: UsersService,
    protected readonly authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }

  async getUsers(): Promise<void> {
    try {
      this.users = await this.usersService.getList();
    } catch (e) {
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (
      await confirm(
        $localize`:@@admin-users.Are-you-sure-you-want-delete-user:Are you sure you want delete user?`,
        $localize`:@@admin-users.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.usersService.delete(id);
      this.users = this.users.filter(u => u.ID !== id);
    } catch (e) {
    }
  }

  openEditUser(user: User): void {
    this.adminUserEdit()?.open(user.ID, user.user_type as UserTypeStringLong);
  }

  onUserTypeChanged(event: UserTypeChanged): void {
    const index = this.users.findIndex(u => u.ID === event.user_id);
    if (index !== -1) {
      this.users[index].user_type = userTypesLongMap.get(event.user_type)!;
    }
  }

}
