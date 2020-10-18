import { ReactStripeElements as Base } from 'react-stripe-elements';

/**
 * Extend Stripe type definitions because they are not up to date with what we need.
 */

declare module 'react-stripe-elements' {
  export namespace ReactStripeElements {
    interface StripeProps {
      paymentRequest: stripe.Stripe['paymentRequest'];
      createSource(sourceData?: Base.SourceOptions): Promise<Base.SourceResponse>;
      createToken(options?: Base.TokenOptions): Promise<Base.PatchedTokenResponse>;
      // The stripe codebase basically uses 'any', these methods are hard to type...
      createPaymentMethod(paymentMethodType: string, elementOrData?: any, maybeData?: MaybeData): Promise<any>;
    }
  }

  export interface MaybeData {
    billing_details?: {
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: number;
        state: string;
      };
      email?: string;
      name?: string;
      phone?: string;
    };
  }

  export interface Card {
    brand: 'amex' | 'diners' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' | 'unknown';
  }

  export interface BillingDetails {
    address: {};
    email: string | null;
    name: string | null;
    phone: string | null;
  }

  export interface PaymentMethod {
    billing_details: BillingDetails;
    card: stripe.Card;
    /* Number of seconds since epoch */
    created: number;
    /* Stripe Customer Object */
    customer: {} | null;
    id: string;
    livemode: boolean;
    metadata: {};
    object: 'payment_method';
    type: string;
  }

  type PaymentRequestStatus =
    | 'success'
    | 'fail'
    | 'invalid_payer_name'
    | 'invalid_payer_email'
    | 'invalid_payer_phone'
    | 'invalid_shipping_address';

  export interface PaymentRequestEvent {
    complete: (status: PaymentRequestStatus) => void;
    methodName: string | null;
    payerEmail: string | null;
    payerName: string | null;
    payerPhone: number | string | null;
    paymentMethod: PaymentMethod;
    shippingAddress: string | null;
    shippingOption: string | null;
  }
}
