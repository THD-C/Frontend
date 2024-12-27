import { Component, OnInit, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CryptoInfo, cryptosInfo, greenCandleColor, redCandleColor, StockPrice, stockPrices, TimeFrame } from './stock.model';
import { appName, defaultCurrency, defaultDate } from '../../../../app.config';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultDisplayCrypto, defaultTimeFrameIndex, timeFrames } from './stock.config';
import { StockOrderComponent } from './stock-order/stock-order.component';
import { GetOrdersRequest, Order, OrderSide, OrderSideString, OrderStatusString, OrderType } from './stock-order/stock-order.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { SelectionChangedEvent } from 'devextreme/ui/select_box';
import { OrdersService } from '../../../../services/orders/orders.service';
import { Wallet } from '../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { WalletsService } from '../../../../services/wallets/wallets.service';
import { getOrderHistoryEntrycash_quantityPrefixLabel, getOrderHistoryEntrySideLabel, getOrderHistoryEntryStatusLabel } from './stock-order/stock-order.config';
import { CurrenciesService } from '../../../../services/currencies/currencies.service';
import { CurrencyType } from '../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  providers: [DecimalPipe],
})
export class StockComponent implements OnInit {
  
  protected readonly OrderType = OrderType;
  protected readonly OrderSide = OrderSide;
  protected readonly OrderSideString = OrderSideString;
  protected readonly OrderStatusString = OrderStatusString;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly defaultDate = defaultDate;
  protected readonly cryptosInfo = cryptosInfo;

  stockOrderPopup = viewChild.required<StockOrderComponent>('stockOrderPopup');

  displayCurrency: Currency = defaultCurrency;
  displayCrypto: Currency = defaultDisplayCrypto;
  stockPrices: StockPrice[] = stockPrices;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  timeFrames: TimeFrame[] = timeFrames;

  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;

  currentCryptoOrders: Order[] = [];
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];

  get currentProfitInPercentage(): number {
    return (this.cryptoOrdersTotal + this.currentProfit) / this.cryptoOrdersTotal;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: RouterExtendedService,
    private readonly decimalPipe: DecimalPipe,
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly currenciesService: CurrenciesService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCurrencies();
    await this.getWallets();
  }

  getOrderHistoryEntrySideLabel = getOrderHistoryEntrySideLabel;
  getOrderHistoryEntryStatusLabel = getOrderHistoryEntryStatusLabel;
  getOrderHistoryEntrycash_quantityPrefixLabel = getOrderHistoryEntrycash_quantityPrefixLabel;

  getOrderHistoryEntryFiatWalletLabel(fiat_wallet_id: string): string {
    const fiatWallet = this.wallets.find(({ id }) => id === fiat_wallet_id);
    return fiatWallet?.currency ?? '';
  }

  async getWallets(): Promise<void> {
    this.wallets = await this.walletsService.get();
  }

  async getCurrencies(): Promise<void> {
    this.fiatCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.FIAT });
    this.cryptoCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.CRYPTO });
  }

  customizeTooltip(arg: any) {
    return {
      text: `Open: ${arg.openValue} ${this.displayCurrency.currency_name}<br/>`
          + `Close: ${arg.closeValue} ${this.displayCurrency.currency_name}<br/>`
          + `High: ${arg.highValue} ${this.displayCurrency.currency_name}<br/>`
          + `Low: ${arg.lowValue} ${this.displayCurrency.currency_name}<br/>`,
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
      this.displayCurrency,
    );
  }

  async onDisplayCryptoSelectionChanged(event: SelectionChangedEvent): Promise<void> {
    try {
      const cryptoWallet = this.wallets.find(({ currency }) => currency === this.displayCrypto?.currency_name);
      const orders = await this.ordersService.get({ wallet_id: cryptoWallet?.id } satisfies GetOrdersRequest);
      this.currentCryptoOrders = orders.filter(({ crypto_wallet_id: cryptoWalletId }) => cryptoWalletId === cryptoWallet?.id)
        .sort((a, b) => a.date_created < b.date_created ? 1 : -1);
    } catch(e) {
    }
  }

  onOrderAdded(order: Order): void {
    const cryptoWallet = this.wallets.find(({ id }) => id === order.crypto_wallet_id);
    if (!cryptoWallet) {
      return;
    }

    this.currentCryptoOrders.unshift(order);
  }

}
