import { PaymentStatus } from './Payment';

export interface IPaymentTransactionsItem {
  name: string;
  price: number;
  amount: number;
}

export interface IPaymentTransaction {
  id: number;
  amount: number;
  used_stripe: boolean;
  datetime: string;
  status: PaymentStatus;
  payment_intent_secret: string | null;
  description: string;
  items: IPaymentTransactionsItem[];
}

/**
 * Data sent to the server to create a PaymentTransaction.
 * Typically used for adding and amount to user Saldo.
 */
export interface ICreatePaymentTransaction {
  /** Amount to add in NOK (_not_ øre!) */
  amount: number;
  /** Id of the Stripe PaymentMethod */
  payment_method_id: string;
}

/** Data sent to the server to verify a PaymentStatus:'pending' PaymentTransaction */
export interface IUpdatePaymentTransaction {
  /** ID of the Stripe PaymentIntent */
  payment_intent_id: string;
}
