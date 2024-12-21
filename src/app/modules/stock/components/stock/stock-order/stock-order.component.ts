import { Component, EventEmitter, output } from '@angular/core';
import { Order, OrderSide, orderSidesMap, OrderType, OrderTypeDetail, orderTypeStringMap } from './stock-order.model';
import { currencies, Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { CryptoInfo, cryptosInfo as tempCryptosInfo } from '../stock.model';
import { getOrderAvailableTypes, getOrderButtonTypeType, getPopupTitle } from './stock-order.config';
import { defaultCurrency } from '../../../../../app.config';
import { OrdersService } from '../../../../../services/orders/orders.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { ValueChangedEvent } from 'devextreme/ui/number_box';
import { NotificationsService } from 'angular2-notifications';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { defaultWallet } from '../../../../profile/components/profile/profile-wallets/profile-wallet-edit/profile-wallet-edit.config';
import { BaseService } from '../../../../../services/base/base.service';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrl: './stock-order.component.scss'
})
export class StockOrderComponent {
  
  protected readonly currencies = currencies;
  protected readonly cryptosInfo = tempCryptosInfo;
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
  selectedCrypto: CryptoInfo = {
    code: '',
    name: '',
    value: '',
    current_value: 0,
  };
  amount: number = 0;
  nominal: number = 0;
  price: number = 1;
  cryptoOrdersTotal: number = 55_352.98;
  currentProfit: number = 235.32;
  wallets: Wallet[] = [];

  orderAvailableTypes: OrderTypeDetail[] = [];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) {}

  getOrderButtonTypeType = getOrderButtonTypeType;

  async open(
    orderSide: OrderSide,
    crypto: CryptoInfo,
    price: number,
    currency: Currency = defaultCurrency,
  ): Promise<void> {
    this.wallets = await this.walletsService.get();
    this.selectedWallet = this.wallets.find(w => w.currency === currency.code) ?? this.wallets[0];
    this.orderSide = orderSide;
    this.orderAvailableTypes = getOrderAvailableTypes(orderSide);
    this.title = getPopupTitle(orderSide);
    this.selectedCrypto = crypto;
    this.price = price;

    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  resetProperties(): void {
    this.selectedWallet = defaultWallet;
    this.selectedCrypto = {
      code: '',
      name: '',
      value: '',
      current_value: 0,
    };
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
        currency_target: this.selectedCrypto.code,
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
