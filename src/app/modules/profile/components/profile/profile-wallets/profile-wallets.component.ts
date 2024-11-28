import { AfterViewInit, Component } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';

import { Wallet } from './profile-wallets.model';
import { AuthService } from '../../../../../services/auth/auth.service';
import { WalletsService } from '../../../../../services/wallets/wallets.service';

@Component({
  selector: 'app-profile-wallets',
  templateUrl: './profile-wallets.component.html',
  styleUrl: './profile-wallets.component.scss'
})
export class ProfileWalletsComponent implements AfterViewInit {

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

      this.wallets = [
        {
          id: "1",
          currency: "PLN",
          user_id: 1,
          value: 0,
        }
      ];
      this.wallets = await this.walletsService.get({
        user_id: this.authService.session?.id ?? 0
      });
    } catch (e) {
    }
  }

  async createWallet(): Promise<void> {

  }

  async deleteWallet(id: number): Promise<void> {
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
    } catch (e) {
    }
  }

}
