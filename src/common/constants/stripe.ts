/**
 * Stripe _PUBLIC_ keys.
 * Keys are set to a fake key as default, as Stripe requires a key to even render components.
 * Stripe keys can be found in the development settings on the Stripe Account,
 * or in the wiki: https://online.ntnu.no/wiki/komiteer/dotkom/aktuelt/onlineweb4/keys/
 */
export const STRIPE_KEY_ARRKOM = process.env.STRIPE_PUBLIC_KEY_ARRKOM || 'stripe_123';
export const STRIPE_KEY_FAGKOM = process.env.STRIPE_PUBLIC_KEY_FAGKOM || 'stripe_123';
export const STRIPE_KEY_PROKOM = process.env.STRIPE_PUBLIC_KEY_PROKOM || 'stripe_123';
export const STRIPE_KEY_TRIKOM = process.env.STRIPE_PUBLIC_KEY_TRIKOM || 'stripe_123';
