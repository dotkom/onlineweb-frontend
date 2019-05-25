import { useContext, useState } from 'react';

import { IToastMessage, ToastType } from './models';
import { IToastContextState, ToastContext } from './ToastContext';

/**
 * Settings are used for a single instance of the useToast hook.
 * To use multiple settings, use multiple instances of the hook in a single component.
 */
export interface IToastSettings {
  /** Removes the previous message from this hook instance before inserting a new message */
  overwrite?: boolean;
  /** Declare a type used by all the messages created by this instance of the hook */
  type?: ToastType;
  /** Declare a duration used by all the messages created by this instance of the hook */
  duration?: number;
}

export const DEFAULT_SETTINGS: IToastSettings = {
  overwrite: false,
};

/**
 * A hook for interfacing with toast messages.
 * Extends the interfaces in the ToastContext by allowing control of the current/previous message.
 */
export const useToast = (settings = DEFAULT_SETTINGS): IToastContextState => {
  const { addMessage: baseAddMessage, removeMessage, ...rest } = useContext(ToastContext);
  const [currentMessage, setCurrentMessage] = useState<IToastMessage | null>(null);

  /**
   * Extend the addMessage function of ToastContext by storing the message.
   * Applies settings for the instance of the hook that are not global to the entire context.
   */
  const addMessage: typeof baseAddMessage = (newMessage) => {
    if (settings.overwrite && currentMessage) {
      removeMessage(currentMessage.id);
    }
    /** Set the default values only if they are defined in settings and not defined on the message */
    if (settings.duration !== undefined && newMessage.duration === undefined) {
      newMessage.duration = settings.duration;
    }
    /** Set the default values only if they are defined in settings and not defined on the message */
    if (settings.type !== undefined && newMessage.duration === undefined) {
      newMessage.type = settings.type;
    }

    const { message, cancelMessage } = baseAddMessage(newMessage);
    setCurrentMessage(message);
    return { message, cancelMessage };
  };

  return { addMessage, removeMessage, ...rest };
};
