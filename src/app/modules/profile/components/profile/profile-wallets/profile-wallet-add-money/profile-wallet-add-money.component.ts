import { Component, output } from '@angular/core';
import { UpdateWalletRequest, Wallet } from '../profile-wallets.model';
import { NotificationsService } from 'angular2-notifications';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';

@Component({
  selector: 'app-profile-wallet-add-money',
  templateUrl: './profile-wallet-add-money.component.html',
  styleUrl: './profile-wallet-add-money.component.scss'
})
export class ProfileWalletAddMoneyComponent {

  private get isFormValid(): boolean {
    return this.amount > 0;
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
  
  /**
   * How much to add
   */
  amount: number = 1;
  title: string = '';
  
  constructor(
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) { }

  open(wallet: Wallet): void {
    this.visible = true;
    this.wallet = wallet;

    this.title = `${$localize`:@@profile-wallet-add-money.Adding-money-to-wallet:Adding money to wallet`} ${this.wallet.currency}`;
  }

  async add(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      await this.walletsService.update({
        id: this.wallet.id,
        currency: this.wallet.currency,
        value: this.amount,
      } satisfies UpdateWalletRequest);

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallet-add-money.Money-added-successfully:Money added successfully`
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