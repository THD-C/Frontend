import { Component, output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { BaseService } from '../../../../../../services/base/base.service';
import { CreateWalletRequest, Wallet } from '../profile-wallets.model';
import { blankCreateWalletRequest } from './profile-wallet-create.config';
import { Currency } from '../profile-wallets.config';
import { CurrenciesService } from '../../../../../../services/currencies/currencies.service';
import { CurrencyType } from './profile-wallet-create.model';

@Component({
  selector: 'app-profile-wallet-create',
  templateUrl: './profile-wallet-create.component.html',
  styleUrl: './profile-wallet-create.component.scss'
})
export class ProfileWalletCreateComponent {

  protected title: string = $localize`:@@profile-wallet-create.New-wallet:New wallet`;
  private get isFormValid(): boolean {
    return this.createWalletRequest.currency.length > 0;
  }

  onSaved = output<Wallet>();
  
  visible: boolean = false;
  createWalletRequest: CreateWalletRequest = blankCreateWalletRequest;
  currencies: Currency[] = [];
  
  constructor(
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
    private readonly currenciesService: CurrenciesService,
  ) { }

  async open(): Promise<void> {
    await this.getCurrencies();
    this.visible = true;
  }

  async getCurrencies(): Promise<void> {
    try {
      this.currencies = [
        ...await this.currenciesService.get({ currency_type: CurrencyType.FIAT }),
        ...await this.currenciesService.get({ currency_type: CurrencyType.CRYPTO }),
      ];

      this.currencies.sort((a, b) => a.currency_name.localeCompare(b.currency_name));
    } catch (e) {
    }
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      const newWallet = await this.walletsService.create(this.createWalletRequest);

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallet-create.Wallet-saved-successfully:Wallet saved successfully`,
        BaseService.notificationOverride
      );

      this.onSaved.emit(newWallet);
      this.close();
    } catch(e) {
    }
  }

  close(): void {
    this.visible = false;
    this.createWalletRequest = blankCreateWalletRequest;
  }
  
}
