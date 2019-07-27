import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { ToastProvider } from 'core/utils/toast/ToastContext';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import { QueryParamsProviderWithRouter } from './QueryParams';

import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from '../redux/Store';

export interface IProps {
  children: ReactNode;
  helmetContext?: {};
}

const ContextWrapper = ({ children, helmetContext }: IProps) => (
  <QueryParamsProviderWithRouter>
    <StoreProvider>
      <ToastProvider>
        <EventsRepoProvider>
          <FrontpageArticles>
            <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
          </FrontpageArticles>
        </EventsRepoProvider>
      </ToastProvider>
    </StoreProvider>
  </QueryParamsProviderWithRouter>
);

export default ContextWrapper;
