import React, { createContext, FC, useState } from 'react';

import { DEFAULT_MESSAGE, IToastMessage } from './models';

export interface IAddToastReturn {
  message: IToastMessage;
  cancelMessage: () => void;
}

export interface IToastContextState {
  messages: IToastMessage[];
  removeMessage: (id: number) => void;
  addMessage: (message: Partial<IToastMessage>) => IAddToastReturn;
}

export const INITIAL_STATE: IToastContextState = {
  messages: [],
  addMessage: () => {
    throw new Error('Add Toast Message has been called before provider init');
  },
  removeMessage: () => {
    throw new Error('Remove Toast Message has been called before provider init');
  },
};

export const ToastContext = createContext(INITIAL_STATE);

/** Used to set an unique ID for each ToastMessage */
let counter = 0;

export const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState(INITIAL_STATE.messages);

  /** Removes a ToastMessage from the list if displayed messages if it exists */
  const removeMessage = (id: number) => {
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
  const addMessage = (newMessage: Partial<IToastMessage>) => {
    /** Merge defaults with the new message */
    const message = { ...DEFAULT_MESSAGE, ...newMessage, id: counter } as IToastMessage;
    counter++;
    setMessages((allMessages) => [...allMessages, message]);

    const cancelMessage = () => removeMessage(message.id);
    return { message, cancelMessage };
  };

  const value = { messages, removeMessage, addMessage };
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
