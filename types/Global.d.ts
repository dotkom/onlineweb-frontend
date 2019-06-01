/** Requires an import of *anything* to allow additions to the global scope */
// @ts-ignore
import React from 'react';

declare global {
  // tslint:disable-next-line interface-name
  interface Window {
    /**
     * The Stripe script adds a global Stripe object to window when it loads.
     */
    Stripe?: (apiKey: string) => stripe.Stripe;
    /**
     * We don't actually care about the type this function returns, we'll leave that to the Redux Team.
     */
    // tslint:disable-next-line no-any
    __REDUX_DEVTOOLS_EXTENSION__?: () => any; 
  }
}
