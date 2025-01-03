import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

import { routes } from './stock.routes';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { StockAnalyseComponent } from './components/stock-analyse/stock-analyse.component';
import { StockOrderBuyComponent } from './components/stock-analyse/stock-order-buy/stock-order-buy.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockComponent } from './components/stock/stock.component';
import { GridDeleteButtonDirective } from '../../directives/grid-delete-button/grid-delete-button.directive';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    StockAnalyseComponent,
    StockOrderBuyComponent,
    StocksListComponent,
    StockComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,

    GridDeleteButtonDirective,

    DxChartModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxValidatorModule,
    DxRadioGroupModule,
    DxScrollViewModule,
    DxDataGridModule,
  ],
})
export class StockModule { }
