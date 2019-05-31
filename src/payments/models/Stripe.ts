export interface IPaymentIntent {
  /** Stripe Object ID */
  id: string;
  /** Stripe Object Type */
  object: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | number | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: null;
      address_postal_code_check: null;
      cvc_check: string | null;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    funding: string;
    generated_from: null;
    last4: string;
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: null;
  };
  created: number;
  customer: null;
  livemode: false;
  metadata: {};
  type: string;
}
