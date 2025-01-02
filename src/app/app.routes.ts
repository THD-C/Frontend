import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: $localize`:@@app.routes.register.title:Increase financial knowledge and develop crypto currencies (sentiments) investment skills with THD(C) | THD(C)`,
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
  },
  {
    title: $localize`:@@app.routes.login.title:Log in to THD(C) | THD(C)`,
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    title: $localize`:@@app.routes.home.title:Welcome to the THD(C) the world\'s best online tool for training cryptocurrencies trading | THD(C)`,
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    title: $localize`:@@app.routes.profile.title:Account details | THD(C)`,
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    title: $localize`:@@app.routes.stock.title:Explore the stock market, buy or sell crypto | THD(C)`,
    path: 'stock',
    loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule),
  },
  {
    title: $localize`:@@app.routes.privacy.policy.title:Privacy policy | THD(C)`,
    path: 'privacy-policy',
    loadChildren: () => import('./modules/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    title: $localize`:@@app.routes.payment.title:Payment status | THD(C)`,
    path: 'payment',
    loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
  },
  {
    title: $localize`:@@app.routes.admin.title:Admin panel | THD(C)`,
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
