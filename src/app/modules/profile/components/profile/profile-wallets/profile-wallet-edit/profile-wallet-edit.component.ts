import { Component, output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { CreateWalletRequest, UpdateWalletRequest, Wallet } from '../profile-wallets.model';
import { currencies } from '../profile-wallets.config';

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
  wallet: Wallet = {
    id: "0",
    currency: "PLN",
    user_id: 0,
    value: 0,
  };
  
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
          currency: this.wallet.currency
        } satisfies CreateWalletRequest);
      } else {
        this.wallet = await this.walletsService.update({
          ...this.wallet,
        } satisfies UpdateWalletRequest);
      }

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallet-edit.Wallet-saved-successfully:Wallet saved successfully`
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
