import { CryptoDetails } from '../stock-details/stock-details.model';

export type GetCoinsRequest = {
  /**
   * Fiat currency
   */
  currency: string;
}

export type GetCoinsResponse = {
  coins: Coin[];
}

export type Coin = {
  [coin_name: string]: CryptoDetails,
}
