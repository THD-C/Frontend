import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { SeriesType } from 'devextreme/common/charts';
import { NotificationsService } from 'angular2-notifications';
import { availableChartTypes, ChartType, CryptoDetails, CryptoPrice as CryptoHistorialDataEntry, TimeFrame } from './stock-analyse.model';
import { appName, defaultCurrency, defaultDate, dxPallet } from '../../../../app.config';
import { defaultChartType, defaultCrypto, defaultCryptoDetails, defaultTimeFrameIndex, dxChartButtonMenuOptions, greenCandleColor, redCandleColor, stockQueryParamNames, timeFrames } from './stock-analyse.config';
import { StockOrderBuyComponent } from './stock-order-buy/stock-order-buy.component';
import { GetOrdersRequest, Order, OrderSide, OrderSideString, OrderStatusLongString, OrderStatusString, OrderType } from './stock-order-buy/stock-order-buy.model';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { OrdersService } from '../../../../services/orders/orders.service';
import { WalletsService } from '../../../../services/wallets/wallets.service';
import { getOrderHistoryEntryCashQuantityPrefixLabel, getOrderHistoryEntrySideLabel, getOrderHistoryEntryStatusLabel } from './stock-order-buy/stock-order-buy.config';
import { CurrenciesService } from '../../../../services/currencies/currencies.service';
import { CryptosService } from '../../../../services/cryptos/cryptos.service';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { Wallet } from '../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { CurrencyType } from '../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { BaseService } from '../../../../services/base/base.service';
import { StockOrderSellComponent } from './stock-order-sell/stock-order-sell.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-analyse',
  templateUrl: './stock-analyse.component.html',
  styleUrl: './stock-analyse.component.scss',
  providers: [DatePipe, DecimalPipe],
})
export class StockAnalyseComponent implements OnInit, OnDestroy {
  
  protected readonly OrderType = OrderType;
  protected readonly OrderSide = OrderSide;
  protected readonly OrderSideString = OrderSideString;
  protected readonly OrderStatusString = OrderStatusString;
  protected readonly OrderStatusLongString = OrderStatusLongString;
  protected readonly appName = appName;
  protected readonly defaultDate = defaultDate;
  protected readonly dxChartButtonMenuOptions = dxChartButtonMenuOptions;
  protected readonly availableCharTypes = availableChartTypes;
  protected readonly greenCandleColor = greenCandleColor;
  protected readonly redCandleColor = redCandleColor;
  protected readonly dxPallet = dxPallet;
  get seriesColor(): string {
    if (this.isCandlestickChart) {
      return greenCandleColor;
    }

    return this.displayCryptoDetails.market_data.price_change_24h_in_currency > 0 ? greenCandleColor : redCandleColor; 
  }

  stockOrderBuyPopup = viewChild.required<StockOrderBuyComponent>('stockOrderBuyPopup');
  stockOrderSellPopup = viewChild.required<StockOrderSellComponent>('stockOrderSellPopup');

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
  subscriptions: Subscription[] = [];

  constructor(
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
    await this.getWallets();
    this.applyQueryParams();
    await this.getCurrencies();
  }

  ngOnDestroy(): void {
    while (this.subscriptions.length > 0) {
      this.subscriptions.pop();
    }
  }

  getOrderHistoryEntrySideLabel = getOrderHistoryEntrySideLabel;
  getOrderHistoryEntryStatusLabel = getOrderHistoryEntryStatusLabel;
  getOrderHistoryEntryCashQuantityPrefixLabel = getOrderHistoryEntryCashQuantityPrefixLabel;

  applyQueryParams(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.displayCrypto = { currency_name: queryParams.get(stockQueryParamNames.coin_id) ?? defaultCrypto.currency_name };
        this.displayCurrency = { currency_name: queryParams.get(stockQueryParamNames.currency) ?? defaultCurrency.currency_name };
      })
    );
  }

  getOrderHistoryEntryWalletLabel(wallet_id: string): string {
    const wallet = this.wallets.find(({ id }) => id === wallet_id);
    return wallet?.currency ?? '';
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

  openStockOrderSellPopup(): void {
    this.stockOrderSellPopup()?.open(
      this.displayCrypto,
      this.displayCurrency,
    );
  }

  openStockOrderBuyPopup(): void {
    this.stockOrderBuyPopup()?.open(
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
    this.updateQueryParams();

    try {
      await this.refreshCrypto();
    } catch(e) {
      console.error(e);
    }
  }

  updateQueryParams(): void {
    const queryParams = {
      [stockQueryParamNames.coin_id]: this.displayCrypto.currency_name,
      [stockQueryParamNames.currency]: this.displayCurrency.currency_name
    }

    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  async onDisplayCryptoSelectionChanged(): Promise<void> {
    this.updateQueryParams();
    
    try {
      const cryptoWallet = this.wallets.find(({ currency }) => currency.toLowerCase() === this.displayCrypto?.currency_name.toLowerCase());
      if (cryptoWallet) {
        this.currentCryptoOrders = await this.ordersService.get({ wallet_id: cryptoWallet.id } satisfies GetOrdersRequest);
      } else {
        this.currentCryptoOrders = []
      }

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
        $localize`:@@stock-analyse.Are-you-sure-you-want-delete-the-order:Are you sure you want delete the order?`,
        $localize`:@@stock-analyse.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.ordersService.delete(id);
      this.currentCryptoOrders = this.currentCryptoOrders.filter(o => o.id !== id);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@stock-analyse.Order-deleted-successfully:Order deleted successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

}
