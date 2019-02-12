import React, { createContext, ReactNode } from 'react';

import { useEventsRepoState } from 'events/hooks/useEventsRepoState';

export const EventsRepo = createContext({} as ReturnType<typeof useEventsRepoState>);

export interface IProps {
  children: ReactNode;
}

export const EventsRepoProvider = ({ children }: IProps) => {
  const eventsRepo = useEventsRepoState();
  return <EventsRepo.Provider value={eventsRepo}>{children}</EventsRepo.Provider>;
};
