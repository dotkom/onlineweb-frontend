import { ReactStripeElements as Base } from 'react-stripe-elements';

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
}
