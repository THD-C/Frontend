import { Component, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { alert } from 'devextreme/ui/dialog';
import { Order, OrderSide, orderSidesMap, OrderType, OrderTypeDetail, orderTypeStringMap } from '../stock-order-buy/stock-order-buy.model';
import { Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultOrderType } from './stock-order-sell.config';
import { defaultCurrency } from '../../../../../app.config';
import { OrdersService } from '../../../../../services/orders/orders.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { ValueChangedEvent } from 'devextreme/ui/number_box';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../../../../../services/base/base.service';
import { defaultWallet } from '../../../../profile/components/profile/profile-wallets/profile-wallet-add-money/profile-wallet-add-money.config';
import { defaultCryptoDetails } from '../stock-analyse.config';
import { CryptoDetails } from '../stock-analyse.model';
import { CryptosService } from '../../../../../services/cryptos/cryptos.service';
import { sellOrderAvailableTypes } from './stock-order-sell.model';
import { RouterExtendedService } from '../../../../../services/router-extended/router-extended.service';
import { getWalletFieldLabel } from '../stock-order-buy/stock-order-buy.config';

@Component({
  selector: 'app-stock-order-sell',
  templateUrl: './stock-order-sell.component.html',
  styleUrl: './stock-order-sell.component.scss',
  providers: [DecimalPipe],
})
export class StockOrderSellComponent {
  
  protected readonly OrderType = OrderType;
  protected readonly orderAvailableTypes: OrderTypeDetail[] = sellOrderAvailableTypes;
  protected readonly orderSide: OrderSide = OrderSide.Sell;
  
  onAdded = output<Order>();

  get nominalExceeded(): boolean {
    return this.nominal > parseFloat(this.selectedCryptoWallet?.value);
  }

  get isFormValid(): boolean {
    return !this.amount || isNaN(this.amount) || !this.nominal || isNaN(this.nominal) || this.nominalExceeded;
  }
  
  visible: boolean = false;
  orderType: OrderType = defaultOrderType;
  selectedFiatWallet: Wallet = defaultWallet;
  selectedCryptoWallet: Wallet = defaultWallet;
  amount: number = 0;
  nominal: number = 0;
  specificPrice: number = 0;
  cryptoWallets: Wallet[] = [];
  fiatWallets: Wallet[] = [];
  
  cryptoDetails: CryptoDetails = defaultCryptoDetails;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
    private readonly cryptosService: CryptosService,
    private readonly router: RouterExtendedService,
    private readonly decimalPipe: DecimalPipe,
  ) {}

  getWalletFieldLabel = getWalletFieldLabel;

  async open(
    crypto: Currency,
    currency: Currency = defaultCurrency,
  ): Promise<void> {
    const wallets = await this.walletsService.get();
    if (wallets.length === 0) {
      await alert(
        $localize`:@@stock-order-sell.You-can-not-create-an-order-because-you-do-not-have-any-wallets-Create-one-and-then-trade-You-will-be-redirected-to-your-profile-where-you-can-specify-a-new-wallet:You can not create an order<br/>because you do not have any wallets.<br/>Create one and then trade.<br/>You will be redirected to your profile<br/>where you can specify a new wallet`,
        $localize`:@@stock-order-sell.Caution:Caution!`
      )

      this.router.openInNewTab('/profile/wallets', '');
      return;
    }

    this.cryptoWallets = wallets.filter(({ is_crypto }) => is_crypto);
    this.fiatWallets = wallets.filter(({ is_crypto }) => is_crypto === false);

    this.selectedCryptoWallet = wallets.find(w => w.currency.toLowerCase() === crypto.currency_name) ?? defaultWallet;
    this.selectedFiatWallet = wallets.find(w => w.currency.toLowerCase() === currency.currency_name) ?? defaultWallet;

    await this.refreshCryptoDetails();

    this.visible = true;
  }

  async refreshCryptoDetails(): Promise<void> {
    this.cryptoDetails = await this.cryptosService.getDetails({
      coin_id: this.selectedCryptoWallet.currency.toLowerCase(),
      currency: this.selectedFiatWallet.currency.toLowerCase(),
    });

    this.specificPrice = this.cryptoDetails.market_data.current_price;
  }

  close(): void {
    this.resetProperties();
    this.visible = false;
  }

  resetProperties(): void {
    this.selectedFiatWallet = defaultWallet;
    this.selectedCryptoWallet = defaultWallet;
    this.amount = 0;
    this.nominal = 0;
    this.specificPrice = 0;
    this.cryptoDetails = defaultCryptoDetails;
    this.cryptoWallets = [];
    this.fiatWallets = [];
    this.orderType = defaultOrderType;
  }

  async confirmOrder(): Promise<void> {
    if (this.isFormValid) {
      return;
    }

    try {
      const newOrder = await this.ordersService.confirmOrder({
        currency_used_wallet_id: this.selectedCryptoWallet.id,
        currency_target: this.selectedFiatWallet.currency,
        nominal: this.nominal.toString(),
        cash_quantity: this.amount.toFixed(2),
        price: this.specificPrice.toFixed(2),
        type: orderTypeStringMap.get(this.orderType) ?? '',
        side: orderSidesMap.get(this.orderSide) ?? '',
      });

      this.notifications.success(
        $localize`:@@stock-order-sell.Success:Success`,
        $localize`:@@stock-order-sell.Order-created-successfully:Order created successfully`,
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
    this.nominal = event.value / this.specificPrice;
  }

  /**
   * Recalculates {@link amount} based on proviced price in on the stock
   * @param event Event's data {@link ValueChangedEvent}
   */
  onNominalChanged(event: ValueChangedEvent): void {
    this.amount = this.specificPrice * event.value;
  }

  /**
   * Recalculates {@link amount} based on proviced price in on the stock
   * @param event Event's data {@link ValueChangedEvent}
   */
  onSpecificPriceChanged(event: ValueChangedEvent): void {
    const specificPrice = event.value;
    this.amount = this.specificPrice * this.nominal;
  }

  onFiatWalletSelectionChanged(): void {
    this.refreshCryptoDetails();
  }

  onCryptoWalletSelectionChanged(): void {
    this.refreshCryptoDetails();
  }

  getFiatWalletFieldLabel(wallet: Wallet): string {
    return `${wallet.currency} (${this.decimalPipe.transform(wallet.value, '1.2-2')})`;
  }

}
