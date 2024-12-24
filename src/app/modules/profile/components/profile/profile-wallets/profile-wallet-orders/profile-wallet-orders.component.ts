import { Component } from '@angular/core';
import { OrdersService } from '../../../../../../services/orders/orders.service';
import { GetOrdersRequest, Order } from '../../../../../stock/components/stock/stock-order/stock-order.model';
import { Wallet } from '../profile-wallets.model';
import { WalletsService } from '../../../../../../services/wallets/wallets.service';
import { defaultWallet } from '../profile-wallet-add-money/profile-wallet-add-money.config';

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

  async cancel(order_id: number): Promise<void> {
    alert(`TODO ${order_id}`);
    
    try {
      
    } catch (e) {
    }
  }
  
  calculateWalletDisplayValue(wallet_id: string): string {
    return this.wallets.find(({ id }) => id === wallet_id)?.currency ?? $localize`:@@profile-wallet-orders.Unknown:Unknown`;
  }

}
