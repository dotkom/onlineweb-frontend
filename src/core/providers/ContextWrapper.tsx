import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { ToastProvider } from 'core/utils/toast/ToastContext';
import { EventsRepoProvider } from 'events/providers/EventsRepo';

import { QueryParamsProvider } from './QueryParams';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <QueryParamsProvider>
    <ToastProvider>
      <EventsRepoProvider>
        <FrontpageArticles>{children}</FrontpageArticles>
      </EventsRepoProvider>
    </ToastProvider>
  </QueryParamsProvider>
);

export default ContextWrapper;
