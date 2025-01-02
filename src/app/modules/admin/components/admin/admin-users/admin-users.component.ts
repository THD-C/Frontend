import { Component, OnInit } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';

import { UsersService } from '../../../../../services/users/users.service';
import { ManageUser } from './admin-users.model';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserType, UserTypeString } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  protected readonly UserType = UserType;

  users: ManageUser[] = [];
  
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
    } catch (e) {
    }
  }

}
