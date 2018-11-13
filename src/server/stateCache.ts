import { getArticles } from 'articles/api';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { getImageEvents } from 'events/api/imageEvents';
import { getListEvents } from 'events/api/listEvents';
import { getOfflines } from 'frontpage/api/offline';
import { DateTime } from 'luxon';
import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import { EMPTY_STATE_CACHE, IServerStateCache } from './models';

export default class StateCache {
  public STATE_KEY = 'owf-state-cache';
  public redisClient: RedisClient;
  public redisGetAsync: (key: string) => string;
  constructor() {
    this.redisClient = redis.createClient();
    this.redisGetAsync = promisify(this.redisClient.get).bind(this.redisClient);
  }

  /**
   * @summary Initialize the 'StateCache' of the server.
   * @description Used to keep a somewhat updated state of what should be rendered
   * in the initial components on the front page. The server side renderer cannot wait for async
   * functionality. The cache is used to make it possible to almost instantly render pages that use it.
   */
  public initStateCache = async () => {
    // TODO: Promise.all?
    const [eventsLeft, eventsMiddle, eventsRight] = await getImageEvents();
    const calendar = await getCalendarEvents(DateTime.local());
    const list = await getListEvents();
    const articles = await getArticles();
    const offline = await getOfflines();
    const cache: IServerStateCache = {
      events: {
        image: {
          eventsLeft,
          eventsMiddle,
          eventsRight,
        },
        list,
        calendar,
      },
      articles,
      offline,
    };
    this.redisClient.set(this.STATE_KEY, JSON.stringify(cache));
  };

  public getStateCache = async (): Promise<IServerStateCache> => {
    const cache = await this.redisGetAsync(this.STATE_KEY);
    const parsed = JSON.parse(cache || '');
    return parsed || EMPTY_STATE_CACHE;
  };
}
