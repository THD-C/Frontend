import { Component, output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { CreateWalletRequest, UpdateWalletRequest, Wallet } from '../profile-wallets.model';
import { currencies } from '../profile-wallets.config';
import { defaultWallet } from './profile-wallet-edit.config';
import { BaseService } from '../../../../../../services/base/base.service';

@Component({
  selector: 'app-profile-wallet-edit',
  templateUrl: './profile-wallet-edit.component.html',
  styleUrl: './profile-wallet-edit.component.scss'
})
export class ProfileWalletEditComponent {

  protected readonly currencies = currencies;
  protected title: string = $localize`:@@profile-wallet-edit.New-wallet:New wallet`;
  private get isFormValid(): boolean {
    return this.wallet.currency.length > 0;
  }

  onSaved = output<Wallet>();
  
  visible: boolean = false;
  id: number = 0;
  wallet: Wallet = defaultWallet;

  /**
   * Only visible when wallet is new
   * that is the {@link id} is === 0
   */
  is_crypto: boolean = false;
  
  constructor(
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) { }

  open(id: number = 0): void {
    this.visible = true;
    this.id = id;

    if (this.id > 0) {
      this.title = $localize`:@@profile-wallet-edit.Edit-wallet:Edit wallet`;
    }

    this.getWallet().then(() => {});
  }

  private async getWallet(): Promise<void> {
    if (!this.id) {
      this.wallet = defaultWallet;
      return;
    }

    this.wallet = await this.walletsService.getById(this.id);
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      if (!this.id) {
        this.wallet = await this.walletsService.create({
          currency: this.wallet.currency,
          is_crypto: this.is_crypto,
        } satisfies CreateWalletRequest);
      } else {
        this.wallet = await this.walletsService.update({
          ...this.wallet,
          value: this.wallet.value.toString()
        } satisfies UpdateWalletRequest);
      }

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallet-edit.Wallet-saved-successfully:Wallet saved successfully`,
        BaseService.notificationOverride
      );

      this.onSaved.emit(this.wallet);
      this.close();
    } catch(e) {
    }
  }

  close(): void {
    this.visible = false;
    this.id = 0;
  }
  
}
