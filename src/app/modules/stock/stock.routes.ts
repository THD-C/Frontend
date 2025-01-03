import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth/auth.guard';
import { StockAnalyseComponent } from './components/stock-analyse/stock-analyse.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockComponent } from './components/stock/stock.component';

export const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'list',
        component: StocksListComponent,
      },
      {
        path: 'analyse',
        component: StockAnalyseComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ]
  },
];
