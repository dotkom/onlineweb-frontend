import { __SERVER__, __SSR__ } from 'common/constants/environment';

export enum PrefetchKey {
  EVENTS_CALENDAR = 'EVENTS_CALENDAR',
  EVENTS_LIST = 'EVENTS_LIST',
  EVENTS_IMAGE = 'EVENTS_IMAGE',
  EVENT_SINGLE = 'EVENT_SINGLE',
  CAREER = 'CAREER',
  ARTICLES = 'ARTICLES',
  OFFLINES = 'OFFLINES',
}

export type Fetcher = () => Promise<{}>;

export default class PrefetchState {
  public keys: PrefetchKey[] = [];
  public fetchers: Array<Promise<{}>> = [];
  public values: Array<{}> = [];

  public queue = (fetcher: Fetcher, key: PrefetchKey) => {
    if (__SERVER__) {
      this.fetchers.push(fetcher());
      this.keys.push(key);
    }
  };

  public get = (key: PrefetchKey) => {
    const index = this.keys.indexOf(key);
    return this.values[index];
  };

  public has = (key: PrefetchKey): boolean => {
    return this.keys.indexOf(key) >= 0;
  };

  public fetchAll = async () => {
    await Promise.all(this.fetchers);
    this.fetchers.map((fetcher, i) =>
      fetcher.then((value) => {
        this.values[i] = value;
      })
    );
  };

  public getData = () => {
    const data: { [key: string]: {} } = {};
    for (let i = 0; i < this.keys.length; i++) {
      data[this.keys[i]] = this.values[i];
    }
    return data;
  };

  public serialize = () => {
    if (!__SSR__) {
      return;
    }
    const data = JSON.parse(window.__PREFETCHED_STATE__);
    Object.keys(data).forEach((key) => {
      this.keys.push(key as PrefetchKey);
      this.values.push(data[key]);
    });
  };
}
