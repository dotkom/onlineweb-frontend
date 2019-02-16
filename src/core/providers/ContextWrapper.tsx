import React, { ReactNode } from 'react';

import FrontpageArticles from 'articles/providers/FrontpageArticles';
import { EventsRepoProvider } from 'events/providers/EventsRepo';
import OfflineIssues from 'frontpage/providers/OfflineIssues';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <EventsRepoProvider>
    <FrontpageArticles>
      <OfflineIssues>{children}</OfflineIssues>
    </FrontpageArticles>
  </EventsRepoProvider>
);

export default ContextWrapper;
