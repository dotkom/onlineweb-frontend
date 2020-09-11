import React, { createContext, FC, useState } from 'react';

import { DEFAULT_SETTINGS, IToastMessage, IToastSettings } from './models';

export interface IAddToastReturn {
  message: IToastMessage;
  cancelToast: () => void;
}

export interface IToastContextState {
  messages: IToastMessage[];
  removeToast: (id: number) => void;
  createToast: (content: string | JSX.Element, settings: IToastSettings) => IAddToastReturn;
}

export const INITIAL_STATE: IToastContextState = {
  messages: [],
  createToast: () => {
    throw new Error('Add Toast Message has been called before provider init');
  },
  removeToast: () => {
    throw new Error('Remove Toast Message has been called before provider init');
  },
};

export const ToastContext = createContext(INITIAL_STATE);

/** Used to set an unique ID for each ToastMessage */
let counter = 0;

export const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState(INITIAL_STATE.messages);

  /** Removes a ToastMessage from the list if displayed messages if it exists */
  const removeToast = (id: number) => {
    setMessages((allMessages) => {
      const index = allMessages.findIndex((message) => message.id === id);
      if (index !== -1) {
        const newMessages = [...allMessages];
        newMessages.splice(index, 1);
        return newMessages;
      }
      return allMessages;
    });
  };

  /** Adds a new ToastMessage to the list of messages */
  const createToast = (content: string | JSX.Element, settings: IToastSettings) => {
    const { duration = DEFAULT_SETTINGS.duration, type = DEFAULT_SETTINGS.type } = settings;
    /** Merge defaults with the new message */
    const message: IToastMessage = {
      id: counter,
      content,
      duration,
      type,
    };
    counter++;
    setMessages((allMessages) => [...allMessages, message]);

    const cancelToast = () => removeToast(message.id);
    return { message, cancelToast };
  };

  const value = { messages, removeToast, createToast };
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
