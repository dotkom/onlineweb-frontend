import { ReactStripeElements as Base } from 'react-stripe-elements';

/**
 * The Stripe script adds a global Stripe object to window when it loads.
 */
declare global {
  // tslint:disable-next-line interface-name
  interface Window {
    Stripe?: (apiKey: string) => stripe.Stripe;
  }
}

/**
 * Extend Stripe type definitions because they are not up to date with what we need.
 */

declare module 'react-stripe-elements' {

  export namespace ReactStripeElements {
    // tslint:disable-next-line interface-name
    interface StripeProps {
      paymentRequest: stripe.Stripe['paymentRequest'];
      createSource(sourceData?: Base.SourceOptions): Promise<Base.SourceResponse>;
      createToken(options?: Base.TokenOptions): Promise<Base.PatchedTokenResponse>;
      // The stripe codebase basically uses 'any', these methods are hard to type...
      // tslint:disable-next-line no-any
      createPaymentMethod(paymentMethodType: string, elementOrData?: any, maybeData?: MaybeData): Promise<any>;
    }
  }

  // tslint:disable-next-line interface-name
  export interface MaybeData {
    billing_details?: {
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: number;
        state: string;
      },
      email?: string;
      name?: string;
      phone?: string;
    };
  }

  // tslint:disable-next-line interface-name
  export interface Card {
    brand: 'amex' | 'diners' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' | 'unknown';
  }

  // tslint:disable-next-line interface-name
  export interface BillingDetails {
    address: {};
    email: string | null;
    name: string | null;
    phone: string | null;
  }

  // tslint:disable-next-line interface-name
  export interface PaymentMethod {
    billing_details: BillingDetails
    card: stripe.Card;
    /* Number of seconds since epoch */
    created: number;
    /* Stripe Customer Object */
    customer: {} | null;
    id: string;
    livemode: boolean;
    metadata: {}
    object: 'payment_method';
    type: string;
  }

  type PaymentRequestStatus =
    | 'success'
    | 'fail'
    | 'invalid_payer_name'
    | 'invalid_payer_email'
    | 'invalid_payer_phone'
    | 'invalid_shipping_address'

  // tslint:disable-next-line interface-name
  export interface PaymentRequestEvent {
    complete: (status: PaymentRequestStatus) => void;
    methodName: string | null;
    payerEmail: string | null;
    payerName: string | null;
    payerPhone: number | string | null;
    paymentMethod: PaymentMethod
    shippingAddress: string | null;
    shippingOption: string | null;
  }
}
