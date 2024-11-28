import { Route } from '@angular/router';

import { authGuard } from '../../guards/auth/auth.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';
import { ProfileCredentialsComponent } from './components/profile/profile-credentials/profile-credentials.component';

export const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'details',
        component: ProfileDetailsComponent
      },
      {
        path: 'credentials',
        component: ProfileCredentialsComponent,
      },
      {
        path: '**',
        component: ProfileDetailsComponent,
      },
    ],
  },
];
