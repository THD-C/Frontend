import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';

import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';

import { HeaderComponent } from '../../shared/components/header/header.component';
import { StockComponent } from './components/stock/stock.component';
import { routes } from './stock.routes';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    StockComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,

    DxChartModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxNumberBoxModule,
  ],
})
export class StockModule { }
