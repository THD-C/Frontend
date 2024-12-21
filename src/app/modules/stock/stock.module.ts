import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';

import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

import { routes } from './stock.routes';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { StockComponent } from './components/stock/stock.component';
import { StockOrderComponent } from './components/stock/stock-order/stock-order.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    StockComponent,
    StockOrderComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,

    DxChartModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxValidatorModule,
    DxRadioGroupModule,
    DxScrollViewModule,
  ],
})
export class StockModule { }
