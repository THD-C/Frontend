import { Routes } from '@angular/router';

import { authGuard } from '../../guards/auth/auth.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileWalletsComponent } from './components/profile/profile-wallets/profile-wallets.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { ProfilePaymentsComponent } from './components/profile/profile-payments/profile-payments.component';
import { ProfileStatistictsComponent } from './components/profile/profile-statisticts/profile-statisticts.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'details',
        component: ProfileDetailsComponent,
      },
      {
        path: 'wallets',
        component: ProfileWalletsComponent,
      },
      {
        path: 'password',
        component: ProfilePasswordComponent,
      },
      {
        path: 'payments',
        component: ProfilePaymentsComponent,
      },
      {
        path: 'statisticts',
        component: ProfileStatistictsComponent,
      },
      {
        path: '**',
        redirectTo: 'details',
      },
    ],
  },
];
