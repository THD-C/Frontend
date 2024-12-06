import { Component } from '@angular/core';
import { OrderSide, OrderType, OrderTypeDetail } from './stock-order.model';
import { currencies, Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { CryptoInfo, cryptosInfo as tempCryptosInfo } from '../stock.model';
import { defaultOrderType, getOrderAvailableTypes, getOrderButtonTypeType } from './stock-order.config';
import { defaultCurrency } from '../../../../../app.config';

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
  selectedCurrency: Currency = defaultCurrency;
  selectedCrypto!: CryptoInfo;

  orderAvailableTypes: OrderTypeDetail[] = [];

  getOrderButtonTypeType = getOrderButtonTypeType;
  
  selectOrderType(value: OrderType): void {
    this.selectedOrderType = value;
  }

  open(
    orderSide: OrderSide,
    crypto: CryptoInfo,
    currency: Currency = defaultCurrency,
  ): void {
    this.orderSide = orderSide;
    this.orderAvailableTypes = getOrderAvailableTypes(orderSide);
    this.selectedCrypto = crypto;
    this.selectedCurrency = currency;

    this.visible = true;
  }

  close(): void {
    this.selectedCurrency = defaultCurrency;

    this.visible = false;
  }


}
