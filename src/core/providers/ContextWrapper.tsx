import React, { ReactNode } from 'react';

import { ToastProvider } from 'core/utils/toast/ToastContext';

import { QueryParamsProvider } from './QueryParams';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <QueryParamsProvider>
    <ToastProvider>{children}</ToastProvider>
  </QueryParamsProvider>
);

export default ContextWrapper;
