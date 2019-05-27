import { IPayment, IPaymentPrice, PaymentStatus } from './Payment';

export interface IPaymentRelation {
  payment: IPayment;
  payment_price: IPaymentPrice;
  datetime: string;
  refunded: boolean;
  payment_intent_secret: string | null;
  status: PaymentStatus;
}

/** Data sent to the server to paying for a payment */
export interface ICreatePaymentRelation {
  /** ID of the Payment */
  payment: number;
  /** ID of the PaymentPrice */
  payment_price: number;
  /** ID of the Stripe PaymentMethod */
  payment_method_id: string;
}

/** Data sent to the server for verifying a payment in progress */
export interface IUpdatePaymentRelation {
  /** ID of the Stripe PaymentIntent */
  payment_intent_id: string;
}
