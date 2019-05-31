import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { ToastProvider } from 'core/utils/toast/ToastContext';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import { QueryParamsProviderWithRouter } from './QueryParams';

import { HelmetProvider } from 'react-helmet-async';

export interface IProps {
  children: ReactNode;
  helmetContext?: {};
}

const ContextWrapper = ({ children, helmetContext }: IProps) => (
  <QueryParamsProviderWithRouter>
    <ToastProvider>
      <EventsRepoProvider>
        <FrontpageArticles>
          <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
        </FrontpageArticles>
      </EventsRepoProvider>
    </ToastProvider>
  </QueryParamsProviderWithRouter>
);

export default ContextWrapper;
