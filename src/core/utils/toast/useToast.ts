import { useContext, useState } from 'react';

import { DEFAULT_SETTINGS, IToastMessage, IToastSettings } from './models';
import { ToastContext } from './ToastContext';

/**
 * Settings are used for a single instance of the useToast hook.
 * To use multiple settings, use multiple instances of the hook in a single component.
 */

export type AddToast = (content: string, messageSettings?: Partial<IToastSettings>) => [IToastMessage, () => void];
export type CancelToast = () => void;

/**
 * A hook for interfacing with toast messages.
 * Extends the interfaces in the ToastContext by allowing control of the current/previous message.
 */
export const useToast = (hookSettings: Partial<IToastSettings> = {}): [AddToast, CancelToast] => {
  const { createToast, removeToast } = useContext(ToastContext);
  const [currentToast, setCurrentToast] = useState<IToastMessage | null>(null);

  const cancelCurrentToast: CancelToast = () => {
    setCurrentToast((current) => {
      if (current) {
        removeToast(current.id);
        return null;
      }
      return currentToast;
    });
  };

  /**
   * Extend the createToast function of ToastContext by storing the toast and applying settings.
   * Applies settings for the instance of the hook that are not global to the entire context.
   */
  const addToast: AddToast = (content, messageSettings = {}) => {
    /** Merge the defualt settings, hook level settings and message level settings */
    const settings: IToastSettings = {
      ...DEFAULT_SETTINGS,
      ...hookSettings,
      ...messageSettings,
    };

    if (settings.overwrite) {
      cancelCurrentToast();
    }

    const { message, cancelToast } = createToast(content, settings);
    setCurrentToast(message);
    return [message, cancelToast];
  };

  return [addToast, cancelCurrentToast];
};
