import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { EventsRepoProvider } from 'events/providers/EventsRepo';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <EventsRepoProvider>
    <FrontpageArticles>{children}</FrontpageArticles>
  </EventsRepoProvider>
);

export default ContextWrapper;
