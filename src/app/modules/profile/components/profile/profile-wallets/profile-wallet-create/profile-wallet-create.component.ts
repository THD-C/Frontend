import { Component, output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { BaseService } from '../../../../../../services/base/base.service';
import { CreateWalletRequest, Wallet } from '../profile-wallets.model';
import { currencies } from '../profile-wallets.config';
import { blankCreateWalletRequest } from './profile-wallet-create.config';

@Component({
  selector: 'app-profile-wallet-create',
  templateUrl: './profile-wallet-create.component.html',
  styleUrl: './profile-wallet-create.component.scss'
})
export class ProfileWalletCreateComponent {

  protected readonly currencies = currencies;
  protected title: string = $localize`:@@profile-wallet-create.New-wallet:New wallet`;
  private get isFormValid(): boolean {
    return this.createWalletRequest.currency.length > 0;
  }

  onSaved = output<Wallet>();
  
  visible: boolean = false;
  createWalletRequest: CreateWalletRequest = blankCreateWalletRequest;
  
  constructor(
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) { }

  open(): void {
    this.visible = true;
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
