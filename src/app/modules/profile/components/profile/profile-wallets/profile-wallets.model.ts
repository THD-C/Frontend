export type Wallet = {
  id: string;
  currency: string;
  value: number;
  user_id: number;
}

export type CreateWalletRequest = {
  currency: string;
}

export type UpdateWalletRequest = {
  id: string;
  currency: string;
  value: number;
}

export type GetWalletsResponse = {
  wallets: Wallet[];
}

