import { Component, OnInit, viewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { availableChartTypes, ChartType, CryptoDetails, CryptoPrice as CryptoHistorialDataEntry, greenCandleColor, redCandleColor, TimeFrame } from './stock-details.model';
import { appName, defaultCurrency, defaultDate, dxPallet } from '../../../../app.config';
import { defaultChartType, defaultCrypto, defaultCryptoDetails, defaultTimeFrameIndex, dxChartButtonMenuOptions, stockQueryParamNames, timeFrames } from './stock-details.config';
import { StockOrderComponent } from './stock-order/stock-order.component';
import { GetOrdersRequest, Order, OrderSide, OrderSideString, OrderStatusLongString, OrderStatusString, OrderType } from './stock-order/stock-order.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { OrdersService } from '../../../../services/orders/orders.service';
import { WalletsService } from '../../../../services/wallets/wallets.service';
import { getOrderHistoryEntryCashQuantityPrefixLabel, getOrderHistoryEntrySideLabel, getOrderHistoryEntryStatusLabel } from './stock-order/stock-order.config';
import { CurrenciesService } from '../../../../services/currencies/currencies.service';
import { CryptosService } from '../../../../services/cryptos/cryptos.service';
import { SeriesType } from 'devextreme/common/charts';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { Wallet } from '../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { CurrencyType } from '../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss',
  providers: [DatePipe, DecimalPipe],
})
export class StockDetailsComponent implements OnInit {
  
  protected readonly OrderType = OrderType;
  protected readonly OrderSide = OrderSide;
  protected readonly OrderSideString = OrderSideString;
  protected readonly OrderStatusString = OrderStatusString;
  protected readonly OrderStatusLongString = OrderStatusLongString;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly appName = appName;
  protected readonly defaultDate = defaultDate;
  protected readonly dxPallet = dxPallet;
  protected readonly dxChartButtonMenuOptions = dxChartButtonMenuOptions;
  protected readonly availableCharTypes = availableChartTypes;

  stockOrderPopup = viewChild.required<StockOrderComponent>('stockOrderPopup');

  chartType: ChartType = defaultChartType;
  get isCandlestickChart(): boolean  {
    return this.chartType.value === 'candlestick' as SeriesType;
  }

  displayCurrency: Currency = defaultCurrency;
  displayCrypto: Currency = defaultCrypto;
  displayCryptoDetails: CryptoDetails = defaultCryptoDetails;
  historicalData: CryptoHistorialDataEntry[] = [];

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  timeFrames: TimeFrame[] = timeFrames;

  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;

  currentCryptoOrders: Order[] = [];
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];
  statsVisible: boolean = false; 
  fullscreen: boolean = false;
  get toggleFullScreenButtonIcon(): string {
    return this.fullscreen ? 'close' : 'fullscreen';
  }
  get toggleFullScreenButtonHint(): string {
    return this.fullscreen ? $localize`:@@stock.Close-fullscreen:Close fullscreen` : $localize`:@@stock.Fullscreen:Fullscreen`;
  }

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly notifications: NotificationsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.applyQueryParams();
    await this.getCurrencies();
    await this.getWallets();
  }

  getOrderHistoryEntrySideLabel = getOrderHistoryEntrySideLabel;
  getOrderHistoryEntryStatusLabel = getOrderHistoryEntryStatusLabel;
  getOrderHistoryEntryCashQuantityPrefixLabel = getOrderHistoryEntryCashQuantityPrefixLabel;

  applyQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.displayCrypto = { currency_name: queryParams.get(stockQueryParamNames.coin_id) ?? defaultCrypto.currency_name };
      this.displayCurrency = { currency_name: queryParams.get(stockQueryParamNames.currency) ?? defaultCurrency.currency_name };
    });
  }

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
    if (this.isCandlestickChart) {
      return {
        text: `Open: ${arg.openValue} ${this.displayCurrency.currency_name}<br/>`
                  + `Close: ${arg.closeValue} ${this.displayCurrency.currency_name}<br/>`
                  + `High: ${arg.highValue} ${this.displayCurrency.currency_name}<br/>`
                  + `Low: ${arg.lowValue} ${this.displayCurrency.currency_name}<br/>`,
      };
    }

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
      await this.refreshCrypto();
    } catch(e) {
    }
  }

  async onDisplayCurrencySelectionChanged(): Promise<void> {
    try {
      await this.refreshCrypto();
    } catch(e) {
      console.error(e);
    }
  }

  async onDisplayCryptoSelectionChanged(): Promise<void> {
    try {
      const cryptoWallet = this.wallets.find(({ currency }) => currency === this.displayCrypto?.currency_name);
      this.currentCryptoOrders = await this.ordersService.get({ wallet_id: cryptoWallet?.id } satisfies GetOrdersRequest);
      this.currentCryptoOrders.sort((a, b) => a.date_created < b.date_created ? 1 : -1);

      await this.refreshCrypto();
    } catch(e) {
      console.error(e);
    }
  }

  async refreshCrypto(): Promise<void> {
    await this.refreshCryptoDetails();
    await this.refreshCryptoHistoricalData();
  }

  async refreshCryptoDetails(): Promise<void> {
    this.displayCryptoDetails = await this.cryptosService.getDetails({
      coin_id: this.displayCrypto.currency_name,
      currency: this.displayCurrency.currency_name,
    });
  }

  async refreshCryptoHistoricalData(): Promise<void> {
    const { dateFrom, dateTo } = this.timeFrames[this.selectedTimeFrameIndex];

    this.historicalData = await this.cryptosService.getHistoricalData({
      coin_id: this.displayCrypto.currency_name,
      currency: this.displayCurrency.currency_name,
      start_date: this.datePipe.transform(dateFrom, 'yyyy-MM-ddTHH:mm:ss.SSS')!,
      end_date: this.datePipe.transform(dateTo, 'yyyy-MM-ddTHH:mm:ss.SSS')!,
      ohlc_data: this.chartType.value === 'candlestick' as SeriesType
    });
  }

  onOrderAdded(order: Order): void {
    if (this.wallets.some(({ id }) => id === order.crypto_wallet_id) === false) {
      return;
    }

    this.currentCryptoOrders.unshift(order);
  }

  showStats(): void {
    this.statsVisible = true;
  }

  toggleFullScreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  backToCoinsList(): void {
    this.router.navigate(['/stock/list']);
  }

  async onChartTypeChanged(): Promise<void> {
    try {
      await this.refreshCryptoHistoricalData();
    } catch (e) {
    }
  }

  async deleteOrder(id: string): Promise<void> {
    if (
      await confirm(
        $localize`:@@stock-details.Are-you-sure-you-want-delete-the-order:Are you sure you want delete the order?`,
        $localize`:@@stock-details.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.ordersService.delete(id);
      this.currentCryptoOrders = this.currentCryptoOrders.filter(o => o.id !== id);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@stock-details.Order-deleted-successfully:Order deleted successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

}
