export type PaymentStatus = 'pending' | 'succeeded' | 'done' | 'refunded' | 'removed';

/** Payment Types are currently implemented by a 'used_stripe' variable. */
export type PaymentType = 'cash' | 'stripe';

export interface IPaymentPrice {
  id: number;
  price: number;
  description?: string;
}

export interface IPayment {
  id: number;
  payment_prices: IPaymentPrice[];
  description: string;
  stripe_public_key: string;
}
