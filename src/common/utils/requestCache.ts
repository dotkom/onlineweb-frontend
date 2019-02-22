import { __SERVER__ } from 'common/constants/environment';

export interface IRequestCacheOptions {
  useCache: boolean;
  cacheTTL: number;
}

const DEFAULT_OPTIONS: IRequestCacheOptions = {
  useCache: true,
  cacheTTL: 60 * 60 * 1000,
};

export interface ICache {
  content: any;
  expires: number;
}

export interface ICacheResponse {
  cache: ICache | null;
  refresh: boolean;
}

const CACHE = new Map<string, ICache>();

export const hasCache = ({ url, options = DEFAULT_OPTIONS }: IGetCache): boolean => {
  return __SERVER__ && options.useCache && CACHE.has(url);
};

export interface IGetCache {
  url: string;
  options?: IRequestCacheOptions;
}

export const getCache = ({ url, options = DEFAULT_OPTIONS }: IGetCache): ICacheResponse => {
  if (__SERVER__ && options.useCache) {
    const cache: ICache | null = CACHE.get(url) || null;
    const response: ICacheResponse = {
      cache,
      refresh: cache ? Date.now() > cache.expires : true,
    };
    return response;
  }
  return { cache: null, refresh: false };
};

export interface ISetCache {
  url: string;
  options?: IRequestCacheOptions;
  content: any;
}

export const setCache = ({ url, options = DEFAULT_OPTIONS, content }: ISetCache) => {
  try {
    if (options.useCache) {
      const cache: ICache = {
        content,
        expires: Date.now() + options.cacheTTL,
      };
      CACHE.set(url, cache);
    }
  } catch (err) {
    /* tslint:disable-next-line no-console */
    console.error(err);
  }
};
