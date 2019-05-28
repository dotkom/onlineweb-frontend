import React, { useEffect, useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { STRIPE_KEY_TRIKOM } from 'common/constants/stripe';
import { StripeForm } from './StripeForm';

export const CreateTransaction = () => {
  const [stripe, setStripe] = useState<stripe.Stripe | null>(null);

  const initStripe = () => {
    if (window.Stripe) {
      setStripe(window.Stripe(STRIPE_KEY_TRIKOM));
    }
  };

  useEffect(() => {
    if (window.Stripe) {
      initStripe();
    } else {
      const script = document.querySelector('#stripe-js');
      if (script) {
        script.addEventListener('load', initStripe);
      }
    }
  }, []);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};
