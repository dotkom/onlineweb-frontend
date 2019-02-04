import { VAPID_PUBLIC_KEY } from 'common/constants/vapid';
import { getServiceWorker } from 'serviceworker/browser';

import { urlBase64ToUint8Array } from './arrayBuffer';

/**
 * Verify browser support for Push Manager.
 */
export const verifyPushManager = (): boolean => {
  return 'PushManager' in window;
};

const DEFAULT_ERROR = 'Not gikk galt under registreringen, ta kontakt med Dotkom.';
const MISSING_PUSH_MANAGER = 'PushManager er ikke tilgjengelig på denne enheten.';
const MISSING_SERVICE_WORKER = 'Kunne ikke registrere ServiceWorker på denne enheten.';
// const NOTIFICATIONS_DENIED = 'Du har blokkert notifikasjoner for dette nettstedet.';
// const NOTIFICATIONS_PROMPT = 'Du må tillate notifikasjoner før du kan registrere enheten.';
const NOTIFICATIONS_REGISTERED = 'Du har allerede registrert notifikasjoner på denne enheten.';
const NEW_REGISTRATION = 'Denne enheten er nå klart for å motta notifikasjoner fra Online!';

export interface IStatus {
  subscription?: PushSubscription;
  message: string;
}

export const registerPushManager = async (): Promise<IStatus> => {
  try {
    if (verifyPushManager()) {
      const registration = await getServiceWorker();
      if (registration.active) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          return { subscription, message: NOTIFICATIONS_REGISTERED };
        } else {
          const vapidArrayBuffer = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
          const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidArrayBuffer,
          });
          return { subscription: newSubscription, message: NEW_REGISTRATION };
        }
      } else {
        return { message: MISSING_SERVICE_WORKER };
      }
    } else {
      return { message: MISSING_PUSH_MANAGER };
    }
  } catch (err) {
    /* tslint:disable-next-line no-console */
    console.error(err);
    return { message: DEFAULT_ERROR };
  }
};

export const getNotificationSubscription = async (): Promise<PushSubscription | null> => {
  try {
    const registration = await getServiceWorker();
    const subscription = await registration.pushManager.getSubscription();
    return subscription;
  } catch (err) {
    /* tslint:disable-next-line no-console */
    console.error(err);
    return null;
  }
};
