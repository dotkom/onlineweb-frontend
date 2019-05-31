import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import { QueryParamsProviderWithRouter } from './QueryParams';

import { HelmetProvider } from 'react-helmet-async';

export interface IProps {
  children: ReactNode;
  helmetContext?: {};
}

const ContextWrapper = ({ children, helmetContext }: IProps) => (
  <QueryParamsProviderWithRouter>
    <EventsRepoProvider>
      <FrontpageArticles>
        <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
      </FrontpageArticles>
    </EventsRepoProvider>
  </QueryParamsProviderWithRouter>
);

export default ContextWrapper;
