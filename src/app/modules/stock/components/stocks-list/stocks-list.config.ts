import { DxSelectBoxTypes } from 'devextreme-angular/ui/select-box';
import { stockQueryParamNames } from '../stock-details/stock-details.config';
import { Params } from '@angular/router';

export const displayCurrencySelectBoxGridToolbar: DxSelectBoxTypes.Properties = {
  width: 200,
  displayExpr: 'currency_name',
  valueExpr: 'currency_name',
  label: $localize`:@@stocks-list.Display-in-currency:Display in currency`,
  labelMode: 'floating',
  searchEnabled: true,
};

export const getStockQueryParams = (coin_id: string, currency: string): Params => {
  return {
    [stockQueryParamNames.coin_id]: coin_id,
    [stockQueryParamNames.currency]: currency
  }
}