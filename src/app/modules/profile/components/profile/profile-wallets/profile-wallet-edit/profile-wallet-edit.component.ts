import { Component } from '@angular/core';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
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
    private readonly authService: AuthService,
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
        await this.walletsService.create({
          ...this.wallet,
          user_id: this.authService.session?.id ?? 0,
        } satisfies CreateWalletRequest);
      } else {
        await this.walletsService.update({
          ...this.wallet,
        } satisfies UpdateWalletRequest);
      }
    } catch(e) {
    }
  }

  close(): void {
    this.visible = false;
    this.id = 0;
  }
}
