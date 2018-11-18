import FrontpageArticles from 'articles/providers/FrontpageArticles';
import EventContextWrapper from 'events/providers/EventContextWrapper';
import OfflineIssues from 'frontpage/providers/OfflineIssues';
import React, { ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: IProps) => (
  <EventContextWrapper accessible={false}>
    <FrontpageArticles>
      <OfflineIssues>{children}</OfflineIssues>
    </FrontpageArticles>
  </EventContextWrapper>
);

export default ContextWrapper;
