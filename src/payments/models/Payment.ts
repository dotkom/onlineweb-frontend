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
  object_id: number;
  content_type: 'events.attendanceevent' | 'webshop.orderline';
  payment_type: string;
  payment_type_display: string;
  payment_prices: IPaymentPrice[];
  description: string;
  stripe_public_key: string;
}
