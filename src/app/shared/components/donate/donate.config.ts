import { defaultCurrency } from '../../../app.config';
import { MakePaymentRequest } from '../../../modules/profile/components/profile/profile-payments/profile-payments.model';
import { Currency } from '../../../modules/profile/components/profile/profile-wallets/profile-wallets.config';

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
