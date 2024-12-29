import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth/auth.guard';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
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
        component: StockDetailsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ]
  },
];
