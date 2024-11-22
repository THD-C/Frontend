import { Component } from '@angular/core';
import { appName } from '../../../../app.config';
import { CryptoInfo as CryptoInfo, greenCandleColor, redCandleColor, StockPrice, stockPrices, cryptosInfo, cryptoStockPrices, CryptoStockPrice } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  stockPrices: StockPrice[] = stockPrices;

  cryptosInfo: CryptoInfo[] = cryptosInfo;

  cryptoStockPrices: CryptoStockPrice[] = cryptoStockPrices;


  customizeTooltip(arg: any) {
    return {
      text: `Open: $${arg.openValue}<br/>`
                + `Close: $${arg.closeValue}<br/>`
                + `High: $${arg.highValue}<br/>`
                + `Low: $${arg.lowValue}<br/>`,
    };
  }
  
}
