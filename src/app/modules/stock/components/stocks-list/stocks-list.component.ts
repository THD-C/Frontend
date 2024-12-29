import { Component, OnInit, viewChild } from '@angular/core';
import { CryptosService } from '../../../../services/cryptos/cryptos.service';
import { CurrenciesService } from '../../../../services/currencies/currencies.service';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { CurrencyType } from '../../../profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';
import { defaultCurrency } from '../../../../app.config';
import { SelectionChangedEvent } from 'devextreme/ui/select_box';
import { displayCurrencySelectBoxGridToolbar, getStockQueryParams } from './stocks-list.config';
import { CryptoDetails } from '../stock-details/stock-details.model';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { ActivatedRoute } from '@angular/router';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrl: './stocks-list.component.scss'
})
export class StocksListComponent implements OnInit {

  coinsGrid = viewChild.required<DxDataGridComponent>('coinsGrid');

  coins: CryptoDetails[] = [];
  fiatCurrencies: Currency[] = [];
  displayCurrency: Currency = defaultCurrency;

  protected readonly displayCurrencySelectBoxGridToolbar = {
    ...displayCurrencySelectBoxGridToolbar,
    value: this.displayCurrency.currency_name,
    items: this.fiatCurrencies,
    onSelectionChanged: this.onDisplayCurrencySelectionChanged.bind(this)
  };

  constructor(
    private readonly cryptosService: CryptosService,
    private readonly currenciesService: CurrenciesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: RouterExtendedService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getFiatCurrencies();
    await this.getCoins();
  }

  getStockQueryParams = getStockQueryParams;

  async getFiatCurrencies(): Promise<void> {
    try {
      this.fiatCurrencies = await this.currenciesService.get({
        currency_type: CurrencyType.FIAT
      });
      this.displayCurrencySelectBoxGridToolbar.items = this.fiatCurrencies;
      this.coinsGrid()?.instance.repaint();
    } catch (e) {
    }
  }

  async getCoins(): Promise<void> {
    try {
      this.coins = await this.cryptosService.getCoins({
        currency: this.displayCurrency.currency_name
      });
    } catch (e) {
    }
  }

  async onDisplayCurrencySelectionChanged(e: SelectionChangedEvent): Promise<void> {
    this.displayCurrency = e.selectedItem;
    await this.getCoins();
  }

  navigateToCoinDetails(coin_id: string): void {
    this.router.navigate(['/stock/analyse'], {
      queryParams: this.getStockQueryParams(coin_id, this.displayCurrency.currency_name),
    });
  }

}
