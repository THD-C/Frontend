import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

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
  styleUrl: './profile-statisticts.component.scss',
  providers: [DecimalPipe],
})
export class ProfileStatistictsComponent implements OnInit {

  readonly dxPallete = dxPallet;

  cryptoWalletsStatistics: CryptoWalletStatistics[] = [];
  fiatCurrencies: Currency[] = [];
  displayCurrency: Currency = defaultCurrency;
  wallets: Wallet[] = [];
  cryptoEstimations: Estimation[] = [];

  constructor(
    private readonly statistictsService: StatisticsService,
    private readonly authService: AuthService,
    private readonly currenciesService: CurrenciesService,
    private readonly walletsService: WalletsService,
    private readonly decimalPipe: DecimalPipe,
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

  async refreshStatistics(): Promise<void> {
    try {
      this.refreshPortfolioDiversity();
      this.refreshEstimations();
    } catch (e) {
    }
  }

  async refreshPortfolioDiversity(): Promise<void> {
    const { crypto_wallets_statistics } = await this.statistictsService.getPortfolioDiversity({
      user_id: this.authService.payload?.id ?? '',
      currency: this.displayCurrency.currency_name,
    });
    
    this.cryptoWalletsStatistics = crypto_wallets_statistics;
  }

  async refreshEstimations(): Promise<void> {
    this.cryptoEstimations = [];
    
    const cryptoWallets = this.wallets.filter(({ is_crypto }) => is_crypto);
    for (const cryptoWallet of cryptoWallets) {
      const { estimations } = await this.statistictsService.getCryptoEstimations({
        user_id: this.authService.payload?.id ?? '0',
        currency: this.displayCurrency.currency_name,
        wallet_id: cryptoWallet.id,
      });

      this.cryptoEstimations.push(...estimations);
    }
  }

  async onDisplayCurrencySelectionChanged(): Promise<void> {
    await this.refreshStatistics();
  }

}
