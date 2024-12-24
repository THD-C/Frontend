import { AfterViewInit, Component, viewChild } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';
import { NotificationsService } from 'angular2-notifications';

import { Wallet } from './profile-wallets.model';

import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { BaseService } from '../../../../../services/base/base.service';

import { ProfileWalletCreateComponent } from './profile-wallet-create/profile-wallet-create.component';
import { ProfileWalletAddMoneyComponent } from './profile-wallet-add-money/profile-wallet-add-money.component';
import { ProfileWalletOrdersComponent } from './profile-wallet-orders/profile-wallet-orders.component';

@Component({
  selector: 'app-profile-wallets',
  templateUrl: './profile-wallets.component.html',
  styleUrl: './profile-wallets.component.scss'
})
export class ProfileWalletsComponent implements AfterViewInit {

  profileWalletEditPopup = viewChild.required<ProfileWalletCreateComponent>('profileWalletEditPopup');
  profileWalletAddMoneyPopup = viewChild.required<ProfileWalletAddMoneyComponent>('profileWalletAddMoneyPopup');
  profileWalletOrdersPopup = viewChild.required<ProfileWalletOrdersComponent>('profileWalletOrdersPopup');

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
        $localize`:@@profile-wallets.Wallet-deleted-successfully:Wallet deleted successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

  showOrders(wallet_id: number): void {
    this.profileWalletOrdersPopup()?.open({
      wallet_id: wallet_id.toString()
    });
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
