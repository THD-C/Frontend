import { Component, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { alert } from 'devextreme/ui/dialog';
import { ValueChangedEvent } from 'devextreme/ui/number_box';
import { NotificationsService } from 'angular2-notifications';
import { buyOrderAvailableTypes, Order, OrderSide, orderSidesMap, OrderType, OrderTypeDetail, orderTypeStringMap } from './stock-order-buy.model';
import { Currency } from '../../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { defaultOrderType } from './stock-order-buy.config';
import { defaultCurrency } from '../../../../../app.config';
import { OrdersService } from '../../../../../services/orders/orders.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';
import { BaseService } from '../../../../../services/base/base.service';
import { defaultWallet } from '../../../../profile/components/profile/profile-wallets/profile-wallet-add-money/profile-wallet-add-money.config';
import { CurrenciesService } from '../../../../../services/currencies/currencies.service';
import { CurrencyType } from '../../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { defaultCrypto, defaultCryptoDetails } from '../stock-analyse.config';
import { CryptoDetails } from '../stock-analyse.model';
import { CryptosService } from '../../../../../services/cryptos/cryptos.service';
import { RouterExtendedService } from '../../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-stock-order-buy',
  templateUrl: './stock-order-buy.component.html',
  styleUrl: './stock-order-buy.component.scss',
  providers: [DecimalPipe],
})
export class StockOrderBuyComponent {
  
  protected readonly OrderSide = OrderSide;
  protected readonly OrderType = OrderType;
  protected readonly orderAvailableTypes: OrderTypeDetail[] = buyOrderAvailableTypes;
  protected readonly orderSide: OrderSide = OrderSide.Buy;
  
  onAdded = output<Order>();

  get amountExceeded(): boolean {
    return this.amount > parseFloat(this.selectedFiatWallet?.value);
  }

  get isFormValid(): boolean {
    return !this.amount || isNaN(this.amount) || !this.nominal || isNaN(this.nominal) || this.amountExceeded;
  }
  
  visible: boolean = false;
  orderType: OrderType = defaultOrderType;
  selectedFiatWallet: Wallet = defaultWallet;
  selectedCrypto: Currency = defaultCrypto;
  amount: number = 0;
  nominal: number = 0;
  specificPrice: number = 0;
  wallets: Wallet[] = [];
  fiatCurrencies: Currency[] = [];
  cryptoCurrencies: Currency[] = [];
  
  cryptoDetails: CryptoDetails = defaultCryptoDetails;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
    private readonly currenciesService: CurrenciesService,
    private readonly cryptosService: CryptosService,
    private readonly router: RouterExtendedService,
    private readonly decimalPipe: DecimalPipe,
  ) {}

  async open(
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

    this.selectedFiatWallet = this.wallets.find(w => w.currency.toLowerCase() === currency.currency_name) ?? this.wallets[0];
    this.selectedCrypto = crypto;

    await this.refreshCryptoDetails();
    this.fiatCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.FIAT });
    this.cryptoCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.CRYPTO });

    this.visible = true;
  }

  async refreshCryptoDetails(): Promise<void> {
    this.cryptoDetails = await this.cryptosService.getDetails({
      coin_id: this.selectedCrypto.currency_name,
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
    this.selectedCrypto = defaultCrypto;
    this.amount = 0;
    this.nominal = 0;
    this.specificPrice = 0;
    this.cryptoDetails = defaultCryptoDetails;
    this.wallets = [];
    this.orderType = defaultOrderType;
  }

  async confirmOrder(): Promise<void> {
    if (this.isFormValid) {
      return;
    }

    try {
      const newOrder = await this.ordersService.confirmOrder({
        currency_used_wallet_id: this.selectedFiatWallet.id,
        currency_target: this.selectedCrypto?.currency_name ?? '',
        nominal: this.nominal.toString(),
        cash_quantity: this.amount.toFixed(2),
        price: this.specificPrice.toFixed(2),
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

  onCryptoSelectionChanged(): void {
    this.refreshCryptoDetails();
  }

  getFiatWalletFieldLabel(wallet: Wallet): string {
    return `${wallet.currency} (${this.decimalPipe.transform(wallet.value, '1.2-2')})`;
  }

}
