export type PortfolioDiversityRequest = {
  user_id: string;
  currency: string;
}

export type CryptoWalletStatistics = {
  cryptocurrency: string;
  fiat_value: number;
  current_price: number;
  share_in_portfolio: number;
}

export type PortfolioDiversityResponse = {
  calculation_fiat_currency: string;
  crypto_wallets_statistics: CryptoWalletStatistics[];
}

export type CryptoEstimationRequest = {
  user_id: string;
  currency: string;
  wallet_id: string;
}

export type Estimation = {
  cryptocurrency: string;
  amount: string;
  estimated_fiat_value: number;
}

export type CryptoEstimationResponse = {
  calculation_fiat_currency: string;
  estimations: Estimation[];
}
