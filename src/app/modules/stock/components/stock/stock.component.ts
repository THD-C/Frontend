import { Component, viewChild } from '@angular/core';
import { CryptoInfo, cryptosInfo, greenCandleColor, redCandleColor, StockPrice, stockPrices, TimeFrame } from './stock.model';
import { appName, defaultCurrency } from '../../../../app.config';
import { currencies, Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultDisplayCrypto, defaultTimeFrameIndex, timeFrames } from './stock.config';
import { StockOrderComponent } from './stock-order/stock-order.component';
import { OrderSide, OrderType } from './stock-order/stock-order.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  
  protected readonly OrderType = OrderType;
  protected readonly OrderSide = OrderSide;
  protected readonly currencies = currencies;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly cryptosInfo = cryptosInfo;

  stockOrderPopup = viewChild.required<StockOrderComponent>('stockOrderPopup');

  displayCurrency: Currency = defaultCurrency;
  displayCrypto: CryptoInfo = defaultDisplayCrypto;
  incomeValue: number = 356.21;
  get incomeValueSign(): string {
    if (this.incomeValue > 0) {
      return '+';
    }

    return '';
  }
  stockPrices: StockPrice[] = stockPrices;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  timeFrames: TimeFrame[] = timeFrames;

  customizeTooltip(arg: any) {
    return {
      text: `Open: ${arg.openValue} ${this.displayCurrency.code}<br/>`
                + `Close: ${arg.closeValue} ${this.displayCurrency.code}<br/>`
                + `High: ${arg.highValue} ${this.displayCurrency.code}<br/>`
                + `Low: ${arg.lowValue} ${this.displayCurrency.code}<br/>`,
    };
  }

  openStockOrderPopup(orderSide: OrderSide): void {
    this.stockOrderPopup()?.open(
      orderSide,
      this.displayCrypto,
      this.displayCurrency,
    );
  }

}
