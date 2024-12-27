import { Component, output } from '@angular/core';
import { Order, OrderSide, orderSidesMap, OrderType, OrderTypeDetail, orderTypeStringMap } from './stock-order.model';
import { Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { getOrderAvailableTypes, getOrderButtonTypeType, getPopupTitle } from './stock-order.config';
import { defaultCurrency } from '../../../../../app.config';
import { OrdersService } from '../../../../../services/orders/orders.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { ValueChangedEvent } from 'devextreme/ui/number_box';
import { NotificationsService } from 'angular2-notifications';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { BaseService } from '../../../../../services/base/base.service';
import { defaultWallet } from '../../../../profile/components/profile/profile-wallets/profile-wallet-add-money/profile-wallet-add-money.config';
import { CurrenciesService } from '../../../../../services/currencies/currencies.service';
import { CurrencyType } from '../../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { defaultCrypto } from '../stock.config';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrl: './stock-order.component.scss'
})
export class StockOrderComponent {
  
  protected readonly OrderSide = OrderSide;
  protected readonly OrderType = OrderType;

  onAdded = output<Order>();

  get amountExceeded(): boolean {
    return this.amount > parseFloat(this.selectedWallet?.value);
  }

  get confirmOrderButtonDisabled(): boolean {
    return this.amountExceeded || !this.amount;
  }

  get currentProfitInPercentage(): number {
    return this.cryptoOrdersTotal + this.currentProfit / this.cryptoOrdersTotal;
  }

  title: string = $localize`:@@Execute-market-order:Execute market order`;
  visible: boolean = false;

  orderSide!: OrderSide;
  orderType: OrderType = OrderType.Instant;
  selectedWallet: Wallet = defaultWallet;
  selectedCrypto: Currency = defaultCrypto;
  amount: number = 0;
  nominal: number = 0;
  price: number = 1;
  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];

  orderAvailableTypes: OrderTypeDetail[] = [];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
    private readonly currenciesService: CurrenciesService,
  ) {}

  getOrderButtonTypeType = getOrderButtonTypeType;

  async open(
    orderSide: OrderSide,
    crypto: Currency,
    currency: Currency = defaultCurrency,
  ): Promise<void> {
    this.wallets = await this.walletsService.get();
    this.selectedWallet = this.wallets.find(w => w.currency.toLowerCase() === currency.currency_name) ?? this.wallets[0];
    this.orderSide = orderSide;
    this.orderAvailableTypes = getOrderAvailableTypes(orderSide);
    this.title = getPopupTitle(orderSide);
    this.selectedCrypto = crypto;

    this.fiatCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.FIAT });
    this.cryptoCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.CRYPTO });
    // GET PRICE FROM COIN GECKO
    //this.price = price;

    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  resetProperties(): void {
    this.selectedWallet = defaultWallet;
    this.selectedCrypto = defaultCrypto;
    this.amount = 0;
    this.nominal = 0;
    this.price = 1;
    this.wallets = [];
  }

  async confirmOrder(): Promise<void> {
    if (this.amountExceeded) {
      this.notifications.error(
        $localize`:@@stock-order.Error:Error`,
        $localize`:@@stock-order.Amount-exceeded-Not-enough-funds-in-the wallet:Amount exceeded. Not enough funds in the wallet`,
        BaseService.notificationOverride,
      );

      return;
    }

    try {
      const newOrder = await this.ordersService.confirmOrder({
        currency_used_wallet_id: this.selectedWallet.id,
        currency_target: this.selectedCrypto?.currency_name ?? '',
        nominal: this.nominal.toString(),
        cash_quantity: this.amount.toString(),
        price: this.price.toString(),
        type: orderTypeStringMap.get(this.orderType) ?? '',
        side: orderSidesMap.get(this.orderSide) ?? '',
      });

      this.notifications.success(
        $localize`:@@stock-order.Success:Success`,
        $localize`:@@stock-order.Order-created-successfully:Order created successfully`,
        BaseService.notificationOverride
      );

      this.onAdded.emit(newOrder);
      this.close();
    } catch(e) {
    }
  }

  /**
   * Recalculates {@link nominal} based on proviced price in on the stock
   * @param event Event's data {@link ValueChangedEvent}
   */
  onAmountChanged(event: ValueChangedEvent): void {
    this.nominal = event.value / this.price;
  }

  /**
   * Recalculates {@link amount} based on proviced price in on the stock
   * @param event Event's data {@link ValueChangedEvent}
   */
  onNominalChanged(event: ValueChangedEvent): void {
    this.amount = this.price * event.value;
  }

  amountValidationCallback(callbackData: ValidationCallbackData): boolean {
    if (callbackData.value > this.selectedWallet?.value) {
      return false;
    }

    return true;
  }

}
