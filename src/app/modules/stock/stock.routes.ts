import { Routes } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';

export const routes: Routes = [
  {
    path: '**',
    component: StockComponent,
  },
];
