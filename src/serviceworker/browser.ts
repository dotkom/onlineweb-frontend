import { __CLIENT__ } from 'common/constants/environment';

/**
 * Wrapper for Service Workers.
 */
const serviceWorker = __CLIENT__ ? navigator.serviceWorker : ({} as ServiceWorkerContainer);

/**
 * Verify browser support for Service Workers.
 */
export const verifyServiceWorker = (): boolean => {
  return __CLIENT__ && 'serviceWorker' in navigator;
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  try {
    if (verifyServiceWorker()) {
      const registration = await serviceWorker.register('/serviceworker.js');
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
