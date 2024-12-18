import { defaultCurrency } from '../../../app.config';
import { Currency } from '../../../modules/profile/components/profile/profile-wallets/profile-wallets.config';
import { MakePaymentRequest } from './donate.model';

export const defaultMakePaymentRequest: MakePaymentRequest = {
  currency: defaultCurrency.code,
  nominal: 1,
};

export const currencies: Currency[] = [
  {
    code: 'EUR',
  },
  {
    code: 'GBP',
  },
  {
    code: 'PLN',
  },
  {
    code: 'USD',
  },
];
