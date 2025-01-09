import { Component, OnInit } from '@angular/core';

import { PointClickEvent } from 'devextreme/viz/pie_chart';

import { defaultCurrency, dxPallet } from '../../../../../app.config';
import { StatisticsService } from '../../../../../services/statistics/statistics.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { CryptoWalletStatistics, Estimation } from './profile-statisticts.model';
import { Currency } from '../profile-wallets/profile-wallets.config';
import { CurrenciesService } from '../../../../../services/currencies/currencies.service';
import { CurrencyType } from '../profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { Wallet } from '../profile-wallets/profile-wallets.model';
import { WalletsService } from '../../../../../services/wallets/wallets.service';

@Component({
  selector: 'app-profile-statisticts',
  templateUrl: './profile-statisticts.component.html',
  styleUrl: './profile-statisticts.component.scss'
})
export class ProfileStatistictsComponent implements OnInit {

  readonly dxPallete = dxPallet;

  cryptoWalletsStatistics: CryptoWalletStatistics[] = [];
  fiatCurrencies: Currency[] = [];
  displayCurrency: Currency = defaultCurrency;
  wallets: Wallet[] = [];
  selectedCryptoWallet?: Wallet = undefined;
  cryptoEstimations: Estimation[] = [];

  constructor(
    private readonly statistictsService: StatisticsService,
    private readonly authService: AuthService,
    private readonly currenciesService: CurrenciesService,
    private readonly walletsService: WalletsService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getWallets();
    await this.getFiatCurrencies();
    await this.refreshPortfolioDiversity();
  }

  async getWallets(): Promise<void> {
    try {
      this.wallets = await this.walletsService.get();
    } catch (e) {
    }
  }
  
  async getFiatCurrencies(): Promise<void> {
    this.fiatCurrencies = await this.currenciesService.get({ currency_type: CurrencyType.FIAT });
  }

  async refreshPortfolioDiversity(): Promise<void> {
    try {
      const { crypto_wallets_statistics } = await this.statistictsService.getPortfolioDiversity({
        user_id: this.authService.payload?.id ?? '',
        currency: this.displayCurrency.currency_name,
      });
      
      this.cryptoWalletsStatistics = crypto_wallets_statistics;
      // this.cryptoWalletsStatistics = [
      //   {
      //     cryptocurrency: 'BITCOIN',
      //     fiat_value: 4898400,
      //     current_price: 97968,
      //     share_in_portfolio: 96.43
      //   },
      //   {
      //     cryptocurrency: 'ETHEREUM',
      //     fiat_value: 181562,
      //     current_price: 3631.24,
      //     share_in_portfolio: 3.57
      //   },
      //   {
      //     cryptocurrency: 'RIPPLE',
      //     fiat_value: 23.80,
      //     current_price: 2.38,
      //     share_in_portfolio: 0
      //   }
      // ];
    } catch (e) {
    }
  }

  async getSelectedCryptoEstimations(): Promise<void> {
    if (!this.selectedCryptoWallet) {
      return;
    }

    try {
      const { estimations } = await this.statistictsService.getCryptoEstimations({
        user_id: this.authService.payload?.id ?? '0',
        currency: this.displayCurrency.currency_name,
        wallet_id: this.selectedCryptoWallet.id,
      });

      this.cryptoEstimations = estimations;
    } catch (e) {
    }
  }

  async onDisplayCurrencySelectionChanged(): Promise<void> {
    try {
      await this.getSelectedCryptoEstimations();
    } catch(e) {
      console.error(e);
    }
  }

  pointClickHandler(e: PointClickEvent): void {
    const statisticts = e.target.data as CryptoWalletStatistics;
    this.selectedCryptoWallet = this.wallets.find(w => w.currency.toLowerCase() === statisticts.cryptocurrency.toLowerCase());
  }

}
