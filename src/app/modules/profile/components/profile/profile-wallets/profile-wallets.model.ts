export type Wallet = {
  id: string;
  currency: string;
  value: number;
  user_id: number;
}

export type CreateWalletRequest = {
  currency: string;
  value: number;
  user_id: number;
}

export type UpdateWalletRequest = {
  id: string;
  currency: string;
  value: number;
  user_id: number;
}

