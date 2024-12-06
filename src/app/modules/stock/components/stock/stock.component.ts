import { Component } from '@angular/core';
import { CryptoInfo, cryptosInfo, greenCandleColor, MarketOperation, marketOperations, MarketOperationsGroup, redCandleColor, StockPrice, stockPrices, TimeFrame } from './stock.model';
import { appName } from '../../../../app.config';
import { currencies, Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultDisplayCrypto, defaultDisplayCurrency, defaultMarketOperationGroupType, defaultTimeFrameIndex, timeFrames } from './stock.config';
import { ItemClickEvent } from 'devextreme/ui/button_group';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  
  protected readonly MarketOperationsGroup = MarketOperationsGroup;
  protected readonly currencies = currencies;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly cryptosInfo = cryptosInfo;

  displayCurrency: Currency = defaultDisplayCurrency;
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
  selectedMarketOperationGroupType: MarketOperationsGroup = defaultMarketOperationGroupType;
  timeFrames: TimeFrame[] = timeFrames;
  marketOperations: MarketOperation[] = marketOperations;

  customizeTooltip(arg: any) {
    return {
      text: `Open: ${arg.openValue} ${this.displayCurrency.code}<br/>`
                + `Close: ${arg.closeValue} ${this.displayCurrency.code}<br/>`
                + `High: ${arg.highValue} ${this.displayCurrency.code}<br/>`
                + `Low: ${arg.lowValue} ${this.displayCurrency.code}<br/>`,
    };
  }

  selectMarketOperation(value: MarketOperationsGroup): void {
    this.selectedMarketOperationGroupType = value;
  }

}
