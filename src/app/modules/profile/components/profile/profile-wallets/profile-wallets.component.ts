import { AfterViewInit, Component, viewChild } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';
import { NotificationsService } from 'angular2-notifications';

import { Wallet } from './profile-wallets.model';
import { ProfileWalletEditComponent } from './profile-wallet-edit/profile-wallet-edit.component';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { ProfileWalletAddMoneyComponent } from './profile-wallet-add-money/profile-wallet-add-money.component';

@Component({
  selector: 'app-profile-wallets',
  templateUrl: './profile-wallets.component.html',
  styleUrl: './profile-wallets.component.scss'
})
export class ProfileWalletsComponent implements AfterViewInit {

  profileWalletEditPopup = viewChild.required<ProfileWalletEditComponent>('profileWalletEditPopup');
  profileWalletAddMoneyPopup = viewChild.required<ProfileWalletAddMoneyComponent>('profileWalletAddMoneyPopup');

  wallets: Wallet[] = [];

  constructor(
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.getWallets();
  }

  async getWallets(): Promise<void> {
    try {
      this.wallets = await this.walletsService.get();
    } catch (e) {
    }
  }

  add(): void {
    this.profileWalletEditPopup().open();
  }

  addMoney(wallet: Wallet): void {
    this.profileWalletAddMoneyPopup().open(wallet);
  }

  async delete(id: number): Promise<void> {
    if (
      await confirm(
        $localize`:@@profile-wallets.Are-you-sure-you-want-delete-the-wallet:Are you sure you want delete the wallet?`,
        $localize`:@@profile-wallets.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.walletsService.delete(id);
      this.wallets = this.wallets.filter(w => w.id !== id.toString());
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallets.Wallet-deleted-successfully:Wallet deleted successfully`
      );
    } catch (e) {
    }
  }

  onWalletSaved(wallet: Wallet): void {
    const index = this.wallets.findIndex(({ id }) => id === wallet.id);
    if (index === -1) {
      this.wallets.push(wallet);
    } else {
      this.wallets[index] = wallet;
    }
  }

}
