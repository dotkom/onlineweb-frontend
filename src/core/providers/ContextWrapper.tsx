import React, { ReactNode } from 'react';

import { ToastProvider } from 'core/utils/toast/ToastContext';
import { EventsRepoProvider } from 'events/providers/EventsRepo';

import { QueryParamsProvider } from './QueryParams';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <QueryParamsProvider>
    <ToastProvider>
      <EventsRepoProvider>{children}</EventsRepoProvider>
    </ToastProvider>
  </QueryParamsProvider>
);

export default ContextWrapper;
