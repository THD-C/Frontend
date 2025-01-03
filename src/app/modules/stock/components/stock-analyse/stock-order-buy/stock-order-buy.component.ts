import { Component, output } from '@angular/core';
import { Order, OrderSide, orderSidesMap, OrderType, OrderTypeDetail, orderTypeStringMap } from './stock-order-buy.model';
import { Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { getOrderAvailableTypes, getOrderButtonTypeType, getPopupTitle } from './stock-order-buy.config';
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
import { defaultCrypto, defaultCryptoDetails } from '../stock-analyse.config';
import { CryptoDetails } from '../stock-analyse.model';
import { CryptosService } from '../../../../../services/cryptos/cryptos.service';
import { RouterExtendedService } from '../../../../../services/router-extended/router-extended.service';
import { alert } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-stock-order-buy',
  templateUrl: './stock-order-buy.component.html',
  styleUrl: './stock-order-buy.component.scss'
})
export class StockOrderBuyComponent {
  
  protected readonly OrderSide = OrderSide;
  protected readonly OrderType = OrderType;

  onAdded = output<Order>();

  get amountExceeded(): boolean {
    return this.amount > parseFloat(this.selectedWallet?.value);
  }

  get confirmOrderButtonDisabled(): boolean {
    return this.amountExceeded || !this.amount;
  }

  title: string = $localize`:@@Execute-market-order:Execute market order`;
  visible: boolean = false;

  orderSide!: OrderSide;
  orderType: OrderType = OrderType.Instant;
  selectedWallet: Wallet = defaultWallet;
  selectedCrypto: Currency = defaultCrypto;
  amount: number = 0;
  nominal: number = 0;
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];

  orderAvailableTypes: OrderTypeDetail[] = [];
  cryptoDetails: CryptoDetails = defaultCryptoDetails;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
    private readonly currenciesService: CurrenciesService,
    private readonly cryptosService: CryptosService,
    private readonly router: RouterExtendedService,
  ) {}

  getOrderButtonTypeType = getOrderButtonTypeType;

  async open(
    orderSide: OrderSide,
    crypto: Currency,
    currency: Currency = defaultCurrency,
  ): Promise<void> {
    this.wallets = (await this.walletsService.get()).filter(({ is_crypto }) => is_crypto === false);
    if (this.wallets.length === 0) {
      await alert(
        $localize`:@@stock-order-buy.You-can-not-create-an-order-because-you-do-not-have-any-wallets-Create-one-and-then-trade-You-will-be-redirected-to-your-profile-where-you-can-specify-a-new-wallet:You can not create an order<br/>because you do not have any wallets.<br/>Create one and then trade.<br/>You will be redirected to your profile<br/>where you can specify a new wallet`,
        $localize`:@@stock-order-buy.Caution:Caution!`
      )

      this.router.openInNewTab('/profile/wallets', '');
      return;
    }

    this.selectedWallet = this.wallets.find(w => w.currency.toLowerCase() === currency.currency_name) ?? this.wallets[0];
    this.orderSide = orderSide;
    this.orderAvailableTypes = getOrderAvailableTypes(orderSide);
    this.title = getPopupTitle(orderSide);
    this.selectedCrypto = crypto;

    await this.refreshCryptoDetails();
    this.fiatCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.FIAT });
    this.cryptoCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.CRYPTO });

    this.visible = true;
  }

  async refreshCryptoDetails(): Promise<void> {
    this.cryptoDetails = await this.cryptosService.getDetails({
      coin_id: this.selectedCrypto.currency_name,
      currency: this.selectedWallet.currency.toLowerCase(),
    });
  }

  close(): void {
    this.visible = false;
  }

  resetProperties(): void {
    this.selectedWallet = defaultWallet;
    this.selectedCrypto = defaultCrypto;
    this.amount = 0;
    this.nominal = 0;
    this.cryptoDetails = defaultCryptoDetails;
    this.wallets = [];
  }

  async confirmOrder(): Promise<void> {
    if (this.amountExceeded) {
      this.notifications.error(
        $localize`:@@stock-order-buy.Error:Error`,
        $localize`:@@stock-order-buy.Amount-exceeded-Not-enough-funds-in-the wallet:Amount exceeded. Not enough funds in the wallet`,
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
        price: this.cryptoDetails.market_data.current_price.toString(),
        type: orderTypeStringMap.get(this.orderType) ?? '',
        side: orderSidesMap.get(this.orderSide) ?? '',
      });

      this.notifications.success(
        $localize`:@@stock-order-buy.Success:Success`,
        $localize`:@@stock-order-buy.Order-created-successfully:Order created successfully`,
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
    this.nominal = event.value / this.cryptoDetails.market_data.current_price;
  }

  /**
   * Recalculates {@link amount} based on proviced price in on the stock
   * @param event Event's data {@link ValueChangedEvent}
   */
  onNominalChanged(event: ValueChangedEvent): void {
    this.amount = this.cryptoDetails.market_data.current_price * event.value;
  }

  amountValidationCallback(callbackData: ValidationCallbackData): boolean {
    if (callbackData.value > this.selectedWallet?.value) {
      return false;
    }

    return true;
  }

  onWalletSelectionChanged(): void {
    this.refreshCryptoDetails();
  }

  onCryptoSelectionChanged(): void {
    this.refreshCryptoDetails();
  }

}
