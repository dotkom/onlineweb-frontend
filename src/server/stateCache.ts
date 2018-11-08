import { getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { getImageEvents } from 'events/api/imageEvents';
import { getListEvents } from 'events/api/listEvents';
import { INewEvent } from 'events/models/Event';
import { getOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';
import { DateTime } from 'luxon';

export interface IServerStateCache {
  events: {
    image: {
      left: INewEvent[];
      middle: INewEvent[];
      right: INewEvent[];
    },
    list: INewEvent[];
    calendar: INewEvent[];
  },
  articles: IArticle[];
  offline: IOfflineIssue[];
}

export const initStateCache = async () => {
  const [left, middle, right] = await getImageEvents();
  const calendar = await getCalendarEvents(DateTime.local());
  const list = await getListEvents();
  const articles = await getArticles();
  const offline = await getOfflines();
  global.STATE_CACHE = {
    events: {
      image: { left, middle, right },
      list,
      calendar,
    },
    articles,
    offline,
  }
}
