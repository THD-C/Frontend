import { Component } from '@angular/core';
import { appName, dxPallet } from '../../../../app.config';
import { newsletterButtonOptions } from './home.config';
import { CryptoInfo, CryptoStockPrice, StockPrice } from '../../../stock/components/stock-analyse/stock-analyse.model';
import { cryptosInfo, cryptoStockPrices, stockPrices, UserGrowth, usersGrowth } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly appName = appName;
  protected readonly newsletterButtonOptions = newsletterButtonOptions;
  protected readonly dxPallet = dxPallet;
  stockPrices: StockPrice[] = stockPrices;

  cryptosInfo: CryptoInfo[] = cryptosInfo;

  cryptoStockPrices: CryptoStockPrice[] = cryptoStockPrices;

  usersGrowth: UserGrowth[] = usersGrowth;


  customizeTooltip(arg: any) {
    return {
      text: `Open: $${arg.openValue}<br/>`
                + `Close: $${arg.closeValue}<br/>`
                + `High: $${arg.highValue}<br/>`
                + `Low: $${arg.lowValue}<br/>`,
    };
  }
  
}
