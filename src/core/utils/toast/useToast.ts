import { useContext } from 'react';

import { IToastContextState, ToastContext } from './ToastContext';

export const useToast = (): IToastContextState => {
  return useContext(ToastContext);
};
