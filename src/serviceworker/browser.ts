import { __PROD__ } from 'common/constants/environment';

/**
 * Wrapper for Service Workers.
 */
const serviceWorker = process.browser ? navigator.serviceWorker : ({} as ServiceWorkerContainer);

/**
 * Verify browser support for Service Workers.
 */
export const verifyServiceWorker = (): boolean => {
  return 'serviceWorker' in navigator;
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  const shouldInstallServiceWorker = __PROD__;
  try {
    if (shouldInstallServiceWorker && verifyServiceWorker()) {
      const registration = await serviceWorker.register('/js/serviceworker.js');
      return registration;
    } else {
      throw new Error('Could not register serviceWorker. Browser is not supported');
    }
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);
    return;
  }
};

export const getServiceWorker = async () => {
  return serviceWorker.ready;
};
