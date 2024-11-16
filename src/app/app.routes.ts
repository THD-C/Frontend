import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Increase financial knowledge and develop crypto currencies (sentiments) investment skills with THD(C)',
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
  },
];
