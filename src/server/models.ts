import { IArticle } from 'articles/models/Article';
import { INewEvent } from 'events/models/Event';
import { IOfflineIssue } from 'frontpage/models/Offline';

export interface IServerStateCacheEvents {
  image: {
    eventsLeft: INewEvent[];
    eventsMiddle: INewEvent[];
    eventsRight: INewEvent[];
  };
  list: INewEvent[];
  calendar: INewEvent[];
}

export const EMPTY_STATE_CACHE: IServerStateCache = {
  events: {
    image: {
      eventsLeft: [],
      eventsMiddle: [],
      eventsRight: [],
    },
    list: [],
    calendar: [],
  },
  articles: [],
  offline: [],
};

/** Initial state cache used to pre-render pages with doing async calls */
export interface IServerStateCache {
  events: IServerStateCacheEvents;
  articles: IArticle[];
  offline: IOfflineIssue[];
}
