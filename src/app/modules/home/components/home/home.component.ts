import { Component } from '@angular/core';
import { appName } from '../../../../app.config';
import { CryptoInfo as CryptoInfo, greenCandleColor, redCandleColor, StockPrice, stockPrices, cryptosInfo, cryptoStockPrices, CryptoStockPrice, UserGrowth, usersGrowth } from './home.model';
import { newsletterButtonOptions } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly newsletterButtonOptions = newsletterButtonOptions;
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
