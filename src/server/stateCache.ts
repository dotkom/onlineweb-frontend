import { getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { getImageEvents } from 'events/api/imageEvents';
import { getListEvents } from 'events/api/listEvents';
import { INewEvent } from 'events/models/Event';
import { getOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';
import { DateTime } from 'luxon';

declare global {
  namespace NodeJS {
    /* tslint:disable-next-line interface-name */
    interface Global {
      STATE_CACHE: IServerStateCache;
    }
  }
}

export interface IServerStateCacheEvents {
  image: {
    eventsLeft: INewEvent[];
    eventsMiddle: INewEvent[];
    eventsRight: INewEvent[];
  };
  list: INewEvent[];
  calendar: INewEvent[];
};

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
}

/** Initial state cache used to pre-render pages with doing async calls */
export interface IServerStateCache {
  events: IServerStateCacheEvents;
  articles: IArticle[];
  offline: IOfflineIssue[];
}

/**
 * @summary Initialize the 'StateCache' of the server.
 * @description Used to keep a somewhat updated state of what should be rendered
 * in the initial components on the front page. The server side renderer cannot wait for async
 * functionality. The cache is used to make it possible to almost instantly render pages that use it.
 *
 * TODO: Make it not global. Make it not hacky. It work REALLY well, but it feels og so wrong.
 * TODO: Not store as much data as it currently does. The front-page view does not need all the event data,
 * just what is used to render the front-page. Could ilter it out here, or make an API-endpoint for getting
 * Events without as much data or overhead from relations.
 */
export const initStateCache = async () => {
  // TODO: Promise.all?
  const [eventsLeft, eventsMiddle, eventsRight] = await getImageEvents();
  const calendar = await getCalendarEvents(DateTime.local());
  const list = await getListEvents();
  const articles = await getArticles();
  const offline = await getOfflines();
  global.STATE_CACHE = {
    events: {
      image: { eventsLeft, eventsMiddle, eventsRight },
      list,
      calendar,
    },
    articles,
    offline,
  };
};
