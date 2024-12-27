import { CreateWalletRequest } from '../profile-wallets.model';
import { defaultCurrency } from '../../../../../../app.config';

export const blankCreateWalletRequest: CreateWalletRequest = {
  currency: defaultCurrency.currency_name,
};
