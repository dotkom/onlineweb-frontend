import { IsoDateTime } from 'common/models/Date';

export type PaymentChoice = 'Umiddelbar' | 'Frist' | 'Utsettelse';

export type StripeKeyChoice = 'arrkom' | 'prokom' | 'trikom' | 'fagkom';

export interface IPayment {
  object_id: number;
  payment_type: PaymentChoice;
  deadline: IsoDateTime;
  active: boolean;
  /** Number of days */
  delay: number;
  price: IPaymentPrice;
}

export interface IPaymentPrice {
  /** Price in NOK */
  price: number;
  /** Max length of 128 characters */
  description: string;
}
