import FrontpageArticles from 'articles/providers/FrontpageArticles';
import EventContextWrapper from 'events/providers/EventContextWrapper';
import OfflineIssues from 'frontpage/providers/OfflineIssues';
import React, { ReactNode } from 'react';
import { IServerStateCache } from 'server/stateCache';

export interface IProps extends IServerStateCache {
  children: ReactNode;
}

const ContextWrapper = ({ events, articles, offline, children }: IProps) => (
  <EventContextWrapper {...events} accessible={false}>
    <FrontpageArticles cache={articles}>
      <OfflineIssues cache={offline}>
        { children }
      </OfflineIssues>
    </FrontpageArticles>
  </EventContextWrapper>
);

export default ContextWrapper;
