import { Component } from '@angular/core';
import { OrderSide, orderSideStringMap, OrderType, OrderTypeDetail, orderTypeStringMap } from './stock-order.model';
import { currencies, Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { CryptoInfo, cryptosInfo as tempCryptosInfo } from '../stock.model';
import { defaultOrderType, getOrderAvailableTypes, getOrderButtonTypeType, getPopupTitle } from './stock-order.config';
import { defaultCurrency } from '../../../../../app.config';
import { OrdersService } from '../../../../../services/orders/orders.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { ValueChangedEvent } from 'devextreme/ui/number_box';

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrl: './stock-order.component.scss'
})
export class StockOrderComponent {
  
  protected readonly currencies = currencies;
  protected readonly cryptosInfo = tempCryptosInfo;
  protected readonly OrderSide = OrderSide;

  title: string = $localize`:@@Execute-market-order:Execute market order`;
  visible: boolean = false;

  selectedOrderType: OrderType = defaultOrderType;
  orderSide!: OrderSide;
  selectedWallet!: Wallet;
  selectedCrypto!: CryptoInfo;
  amount: number = 0;
  nominal: number = 0;
  price: number = 1;
  wallets: Wallet[] = [];

  orderAvailableTypes: OrderTypeDetail[] = [];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
  ) {}

  getOrderButtonTypeType = getOrderButtonTypeType;
  
  selectOrderType(value: OrderType): void {
    this.selectedOrderType = value;
  }

  open(
    orderSide: OrderSide,
    crypto: CryptoInfo,
    price: number,
    currency: Currency = defaultCurrency,
  ): void {
    this.walletsService.get().then(wallets => {
      this.wallets = wallets;
      this.selectedWallet = wallets.find(w => w.currency === currency.code) ?? wallets[0];
    });
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

  async placeOrder(): Promise<void> {
    try {
      await this.ordersService.placeOrder({
        currency_used_wallet_id: this.selectedWallet.id,
        currency_target: this.selectedCrypto.code,
        nominal: this.nominal.toString(),
        cash_quantity: '0', // ???
        price: this.price.toString(),
        type: orderTypeStringMap.get(this.selectedOrderType) ?? '',
        side: orderSideStringMap.get(this.orderSide) ?? '',
      });
    } catch(e) {
    }
  }

  onAmountChanged(event: ValueChangedEvent): void {
    this.nominal = event.value / this.price;
  }

  onVolumeChanged(event: ValueChangedEvent): void {
    this.amount = this.price * event.value;
  }

}
