import { AfterViewInit, Component, viewChild } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';

import { Wallet } from './profile-wallets.model';
import { AuthService } from '../../../../../services/auth/auth.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';
import { ProfileWalletEditComponent } from './profile-wallet-edit/profile-wallet-edit.component';

@Component({
  selector: 'app-profile-wallets',
  templateUrl: './profile-wallets.component.html',
  styleUrl: './profile-wallets.component.scss'
})
export class ProfileWalletsComponent implements AfterViewInit {

  profileWalletEditPopup = viewChild.required<ProfileWalletEditComponent>('profileWalletEditPopup');

  wallets: Wallet[] = [];

  constructor(
    private readonly walletsService: WalletsService,
    private readonly authService: AuthService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.getWallets();
  }

  async getWallets(): Promise<void> {
    try {
      this.wallets = await this.walletsService.get({
        user_id: this.authService.session?.id ?? 0
      });
    } catch (e) {
    }
  }

  add(): void {
    this.profileWalletEditPopup().open();
  }

  edit(id: number): void {
    this.profileWalletEditPopup().open(id);
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
