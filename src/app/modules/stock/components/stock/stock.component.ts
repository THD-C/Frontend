import { Component, OnInit, viewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CryptoDetails, CryptoPrice as CryptoHistorialDataEntry, greenCandleColor, redCandleColor, TimeFrame } from './stock.model';
import { appName, defaultCurrency, defaultDate, dxPallet } from '../../../../app.config';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultCrypto, defaultCryptoDetails, defaultTimeFrameIndex, timeFrames } from './stock.config';
import { StockOrderComponent } from './stock-order/stock-order.component';
import { GetOrdersRequest, Order, OrderSide, OrderSideString, OrderStatusString, OrderType } from './stock-order/stock-order.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { OrdersService } from '../../../../services/orders/orders.service';
import { Wallet } from '../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { WalletsService } from '../../../../services/wallets/wallets.service';
import { getOrderHistoryEntryCashQuantityPrefixLabel, getOrderHistoryEntrySideLabel, getOrderHistoryEntryStatusLabel } from './stock-order/stock-order.config';
import { CurrenciesService } from '../../../../services/currencies/currencies.service';
import { CurrencyType } from '../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { CryptosService } from '../../../../services/cryptos/cryptos.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  providers: [DatePipe, DecimalPipe],
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
  protected readonly dxPallet = dxPallet;

  stockOrderPopup = viewChild.required<StockOrderComponent>('stockOrderPopup');

  displayCurrency: Currency = defaultCurrency;
  displayCrypto: Currency = defaultCrypto;
  displayCryptoDetails: CryptoDetails = defaultCryptoDetails;
  historicalData: CryptoHistorialDataEntry[] = [];
  // stockPrices: StockPrice[] = stockPrices;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  timeFrames: TimeFrame[] = timeFrames;

  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;

  currentCryptoOrders: Order[] = [];
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];
  statsVisible: boolean = false; 

  get currentProfitInPercentage(): number {
    return (this.cryptoOrdersTotal + this.currentProfit) / this.cryptoOrdersTotal;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: RouterExtendedService,
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly currenciesService: CurrenciesService,
    private readonly cryptosService: CryptosService,
    private readonly datePipe: DatePipe,
    private readonly decimalPipe: DecimalPipe,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCurrencies();
    await this.getWallets();
  }

  getOrderHistoryEntrySideLabel = getOrderHistoryEntrySideLabel;
  getOrderHistoryEntryStatusLabel = getOrderHistoryEntryStatusLabel;
  getOrderHistoryEntryCashQuantityPrefixLabel = getOrderHistoryEntryCashQuantityPrefixLabel;

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
      text: `
        ${this.datePipe.transform(arg.argument, 'yyyy-MM-dd HH:mm:ss')}<br/>
        ${this.decimalPipe.transform(arg.value, '1.2-2')} ${this.displayCurrency.currency_name}
      `,
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

  async onTimeFrameSelectionChanged(): Promise<void> {
    try {
      await this.refreshCryptoHistoricalData();
    } catch(e) {
    }
  }

  async onDisplayCurrencySelectionChanged(): Promise<void> {
    try {
      await this.refreshCryptoHistoricalData();
    } catch(e) {
      console.error(e);
    }
  }

  async onDisplayCryptoSelectionChanged(): Promise<void> {
    try {
      const cryptoWallet = this.wallets.find(({ currency }) => currency === this.displayCrypto?.currency_name);
      this.currentCryptoOrders = await this.ordersService.get({ wallet_id: cryptoWallet?.id } satisfies GetOrdersRequest);
      this.currentCryptoOrders.sort((a, b) => a.date_created < b.date_created ? 1 : -1);

      await this.refreshCryptoHistoricalData();
    } catch(e) {
      console.error(e);
    }
  }

  async refreshCryptoHistoricalData(): Promise<void> {
    this.displayCryptoDetails = await this.cryptosService.getDetails({
      coin_id: this.displayCrypto.currency_name,
      currency: this.displayCurrency.currency_name,
    });

    this.historicalData = await this.cryptosService.getHistoricalData({
      coin_id: this.displayCrypto.currency_name,
      currency: this.displayCurrency.currency_name,
      start_date: this.datePipe.transform(this.timeFrames[this.selectedTimeFrameIndex].dateFrom, 'yyyy-MM-ddTHH:mm:ss.SSS')!,
      end_date: this.datePipe.transform(this.timeFrames[this.selectedTimeFrameIndex].dateTo, 'yyyy-MM-ddTHH:mm:ss.SSS')!,
    });
  }

  onOrderAdded(order: Order): void {
    if (this.wallets.some(({ id }) => id === order.crypto_wallet_id)) {
      return;
    }

    this.currentCryptoOrders.unshift(order);
  }

  showStats(): void {
    this.statsVisible = true;
  }

}
