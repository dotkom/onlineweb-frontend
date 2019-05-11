import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import { QueryParamsProviderWithRouter } from './QueryParams';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <QueryParamsProviderWithRouter>
    <EventsRepoProvider>
      <FrontpageArticles>{children}</FrontpageArticles>
    </EventsRepoProvider>
  </QueryParamsProviderWithRouter>
);

export default ContextWrapper;
