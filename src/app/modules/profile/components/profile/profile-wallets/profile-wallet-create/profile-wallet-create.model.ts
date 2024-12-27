import { Currency } from '../profile-wallets.config'

export type GetCurrenciesResponse = {
  currencies: Currency[];
}

export type GetCurrenciesRequest = {
  currency_type: CurrencyType;
}

export enum CurrencyType {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO',
}
