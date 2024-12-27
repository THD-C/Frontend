import { defaultCurrency } from '../../../app.config';
import { MakePaymentRequest } from '../../../modules/profile/components/profile/profile-payments/profile-payments.model';
import { Currency } from '../../../modules/profile/components/profile/profile-wallets/profile-wallets.config';

export const defaultMakePaymentRequest: MakePaymentRequest = {
  currency: defaultCurrency.currency_name,
  nominal: 1,
};

export const currencies: Currency[] = [
  {
    currency_name: 'EUR',
  },
  {
    currency_name: 'GBP',
  },
  {
    currency_name: 'PLN',
  },
  {
    currency_name: 'USD',
  },
];
