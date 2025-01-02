import { Routes } from '@angular/router';
import { adminGuard } from '../../guards/admin/admin.guard';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: '**',
        redirectTo: 'users',
      },
    ],
  }
];
