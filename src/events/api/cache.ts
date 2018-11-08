import { getStateCache } from 'common/utils/stateCacheResolver';
import { INewEvent } from 'events/models/Event';

export const getServerCacheCalendarEvents = (): INewEvent[] => {
  const cache = getStateCache();
  return (cache && cache.events.calendar) || [];
};

export const getServerCacheListEvents = (): INewEvent[] => {
  const cache = getStateCache();
  return (cache && cache.events.list) || [];
};

export interface IImageEvents {
  eventsLeft: INewEvent[];
  eventsMiddle: INewEvent[];
  eventsRight: INewEvent[];
  fetched: boolean;
}

export const getServerCacheImageEvents = (): IImageEvents => {
  const cache = getStateCache();
  if (!cache) {
    return {
      eventsLeft: [],
      eventsMiddle: [],
      eventsRight: [],
      fetched: false,
    };
  }
  return cache && { ...cache.events.image, fetched: true };
};
