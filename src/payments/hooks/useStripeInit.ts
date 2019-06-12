import { useEffect, useState } from 'react';

import { useToast } from 'core/utils/toast/useToast';

const DEFAULT_STRIPE_ELEMENT_ID = '#stripe-js';

/**
 * Use a Stripe object instance for a Stripe key.
 * @param stripeKey Stripe public key. Typically defined for each committe
 * @param scriptId The element ID for the Stripe script in the DOM.
 */
export const useStripeInit = (stripeKey: string, scriptId = DEFAULT_STRIPE_ELEMENT_ID) => {
  const [displayError] = useToast({ type: 'error' });
  const [stripe, setStripe] = useState<stripe.Stripe | null>(null);

  const initStripe = (key: string) => {
    if (window.Stripe) {
      try {
        setStripe(window.Stripe(key));
      } catch (err) {
        displayError('Det skjedde en feil under innlastningen av betalingsløsningen');
      }
    }
  };

  useEffect(() => {
    if (window.Stripe) {
      /** Init Stripe directly if the async Stripe script is already loaded */
      initStripe(stripeKey);
    } else {
      /** Init Stripe when the async Script has finished loading by 'load' listener */
      const script = document.querySelector(scriptId);
      if (script) {
        script.addEventListener('load', () => initStripe(stripeKey));
      }
    }
  }, [stripeKey, scriptId]);

  return stripe;
};
