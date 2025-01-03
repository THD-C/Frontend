import { Component } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';

import { OrdersService } from '../../../../../../services/orders/orders.service';
import { GetOrdersRequest, Order } from '../../../../../stock/components/stock-analyse/stock-order-buy/stock-order-buy.model';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { defaultWallet } from '../profile-wallet-add-money/profile-wallet-add-money.config';
import { Wallet } from '../profile-wallets.model';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../../../../../../services/base/base.service';

@Component({
  selector: 'app-profile-wallet-orders',
  templateUrl: './profile-wallet-orders.component.html',
  styleUrl: './profile-wallet-orders.component.scss'
})
export class ProfileWalletOrdersComponent {
  visible: boolean = false;
  title: string = $localize`:@@profile-wallet-orders.Wallet-orders: Wallet orders`;
  orders: Order[] = [];
  wallets: Wallet[] = [];
  current_wallet: Wallet = defaultWallet;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly walletsService: WalletsService,
    private readonly notifications: NotificationsService,
  ) { }

  async open(getOrdersRequest: GetOrdersRequest): Promise<void> {
    try {
      this.orders = await this.ordersService.get(getOrdersRequest);
      this.wallets = await this.walletsService.get();
      this.current_wallet = this.wallets.find(({ id }) => id === getOrdersRequest.wallet_id)!;
      this.title = `${this.current_wallet.currency} ${$localize`:@@profile-wallet-orders.wallet-orders:wallet orders`}`;
    } catch (e) {
    }

    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.orders = [];
    this.wallets = [];
  }

  async deleteOrder(id: string): Promise<void> {
    if (
      await confirm(
        $localize`:@@profile-wallet-orders.Are-you-sure-you-want-delete-the-order:Are you sure you want delete the order?`,
        $localize`:@@profile-wallet-orders.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.ordersService.delete(id);
      this.orders = this.orders.filter(o => o.id !== id);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@profile-wallet-orders.Order-deleted-successfully:Order deleted successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }
  
  calculateWalletDisplayValue(wallet_id: string): string {
    return this.wallets.find(({ id }) => id === wallet_id)?.currency ?? $localize`:@@profile-wallet-orders.Unknown:Unknown`;
  }

}
