import { CryptoDetails } from '../stock-analyse/stock-analyse.model';

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
