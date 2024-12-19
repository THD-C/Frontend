import { Component, viewChild } from '@angular/core';
import { CryptoInfo, cryptosInfo, greenCandleColor, redCandleColor, StockPrice, stockPrices, TimeFrame } from './stock.model';
import { appName, defaultCurrency } from '../../../../app.config';
import { currencies, Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultDisplayCrypto, defaultTimeFrameIndex, timeFrames } from './stock.config';
import { StockOrderComponent } from './stock-order/stock-order.component';
import { OrderSide, OrderType } from './stock-order/stock-order.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  providers: [DecimalPipe],
})
export class StockComponent {
  
  protected readonly OrderType = OrderType;
  protected readonly OrderSide = OrderSide;
  protected readonly currencies = currencies;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly cryptosInfo = cryptosInfo;

  get title(): string {
    const { name, current_value } = this.displayCrypto;
    return `${name} ${this.decimalPipe.transform(current_value, '1.2-2')} ${this.displayCurrency.code}`;
  }

  stockOrderPopup = viewChild.required<StockOrderComponent>('stockOrderPopup');

  displayCurrency: Currency = defaultCurrency;
  displayCrypto: CryptoInfo = defaultDisplayCrypto;
  stockPrices: StockPrice[] = stockPrices;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  timeFrames: TimeFrame[] = timeFrames;

  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;

  get currentProfitInPercentage(): number {
    return (this.cryptoOrdersTotal + this.currentProfit) / this.cryptoOrdersTotal;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: RouterExtendedService,
    private readonly decimalPipe: DecimalPipe,
  ) { }

  customizeTooltip(arg: any) {
    return {
      text: `Open: ${arg.openValue} ${this.displayCurrency.code}<br/>`
                + `Close: ${arg.closeValue} ${this.displayCurrency.code}<br/>`
                + `High: ${arg.highValue} ${this.displayCurrency.code}<br/>`
                + `Low: ${arg.lowValue} ${this.displayCurrency.code}<br/>`,
    };
  }

  openStockOrderPopup(orderSide: OrderSide): void {
    if (this.authService.isAuthenticated === false) {
      this.router.navigateToLogin(this.router.previousUrl);
      return;
    }

    this.stockOrderPopup()?.open(
      orderSide,
      this.displayCrypto,
      833.234,
      this.displayCurrency,
    );
  }

}
