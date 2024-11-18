import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { RegisterCredentialsComponent } from './components/register/register-credentials/register-credentials.component';
import { RegisterAddressComponent } from './components/register/register-address/register-address.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'credentials',
        component: RegisterCredentialsComponent,
      },
      {
        path: 'personal-data',
        component: RegisterCredentialsComponent,
      },
      {
        path: 'address',
        component: RegisterAddressComponent,
      },
    ]
  },
];
