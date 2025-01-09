import { Component, OnInit } from '@angular/core';
import { defaultCurrency, dxPallet } from '../../../../../app.config';
import { StatisticsService } from '../../../../../services/statistics/statistics.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { CryptoWalletStatistics } from './profile-statisticts.model';
import { Currency } from '../profile-wallets/profile-wallets.config';
import { CurrenciesService } from '../../../../../services/currencies/currencies.service';
import { CurrencyType } from '../profile-wallets/profile-wallet-create/profile-wallet-create.model';

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

  constructor(
    private readonly statistictsService: StatisticsService,
    private readonly authService: AuthService,
    private readonly currenciesService: CurrenciesService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getFiatCurrencies();
    await this.refreshPortfolioDiversity();
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
      this.cryptoWalletsStatistics = [
        {
          cryptocurrency: 'BITCOIN',
          fiat_value: 4898400,
          current_price: 97968,
          share_in_portfolio: 96.43
        },
        {
          cryptocurrency: 'ETHEREUM',
          fiat_value: 181562,
          current_price: 3631.24,
          share_in_portfolio: 3.57
        },
        {
          cryptocurrency: 'RIPPLE',
          fiat_value: 23.80,
          current_price: 2.38,
          share_in_portfolio: 0
        }
      ];
    } catch (e) {
    }
  }

  async onDisplayCurrencySelectionChanged(): Promise<void> {
    try {
      await this.refreshPortfolioDiversity();
    } catch(e) {
      console.error(e);
    }
  }

}
