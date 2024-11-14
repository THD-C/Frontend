import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Increase financial knowledge and develop crypto currencies (sentiments) investment skills with THD(C)',
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule),
  },
];
