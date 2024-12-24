export type Wallet = {
  id: string;
  currency: string;
  value: string;
  user_id: string;
  is_crypto: boolean;
}

export type CreateWalletRequest = {
  currency: string;
  is_crypto: boolean;
}

export type UpdateWalletRequest = {
  id: string;
  currency: string;
  value: string;
}

export type GetWalletsResponse = {
  wallets: Wallet[];
}

