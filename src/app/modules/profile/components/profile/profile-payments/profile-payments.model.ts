export type MakePaymentRequest = {
  currency: string;
  nominal: number;
}

export type MakePaymentResponse = {
  session_url: string;
  success_urls: string[];
  failure_urls: string[];
  payment_details: Payment;
}

export type Payment = {
  /**
   * External provider's ID
   */
  id: string;
  currency: string;
  value: number;
  user_id: string;

  /**
   * From API it is as string
   */
  state: string;
}

export type GetPaymentsResponse = {
  payments: Payment[];
}

export enum PaymentState {
  PAYMENT_STATE_UNKNOWN = 0,
  PAYMENT_STATE_PENDING = 1,
  PAYMENT_STATE_ACCEPTED = 2,
  PAYMENT_STATE_CANCELLED = 3,
}

export const paymentStatesMap = new Map<string, PaymentState>([
  ['PAYMENT_STATE_UNKNOWN', PaymentState.PAYMENT_STATE_UNKNOWN],
  ['PAYMENT_STATE_PENDING', PaymentState.PAYMENT_STATE_PENDING],
  ['PAYMENT_STATE_ACCEPTED', PaymentState.PAYMENT_STATE_ACCEPTED],
  ['PAYMENT_STATE_CANCELLED', PaymentState.PAYMENT_STATE_CANCELLED],
]);
