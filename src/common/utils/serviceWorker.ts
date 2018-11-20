/**
 * Wrapper for Service Workers.
 */
const serviceWorker = navigator.serviceWorker;

/**
 * Verify browser support for Service Workers.
 */
export const verifyServiceWorker = (): boolean => {
  return 'serviceWorker' in navigator;
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  try {
    if (verifyServiceWorker()) {
      const registration = await serviceWorker.register('/notifications.js');
      return registration;
    } else {
      throw new Error('Could not register serviceWorker for push notifications. Browser is not supported');
    }
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);
    return;
  }
};
