import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { ToastProvider } from 'core/utils/toast/ToastContext';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import { QueryParamsProviderWithRouter } from './QueryParams';

import { StoreProvider } from '../redux/Store';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <QueryParamsProviderWithRouter>
    <StoreProvider>
      <ToastProvider>
        <EventsRepoProvider>
          <FrontpageArticles>{children}</FrontpageArticles>
        </EventsRepoProvider>
      </ToastProvider>
    </StoreProvider>
  </QueryParamsProviderWithRouter>
);

export default ContextWrapper;
