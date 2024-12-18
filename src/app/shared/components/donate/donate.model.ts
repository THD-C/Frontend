export type MakePaymentRequest = {
  currency: string;
  nominal: number;
}

export type MakePaymentResponse = {
  session_url: string;
  success_urls: string[],
  failure_urls: string[],
  payment_details: {
    /**
     * External provider's ID
     */
    id: string;
    currency: string;
    value: string;
    user_id: string;
    state: string;
  }
}

export enum PaymentState {

}
