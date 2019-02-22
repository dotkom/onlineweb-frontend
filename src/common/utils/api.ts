import { DOMAIN } from '../constants/endpoints';
import { __CLIENT__ } from '../constants/environment';
import { toQueryString } from './queryString';

import { IAuthUser } from 'authentication/models/User';
import { getCache, hasCache, IRequestCacheOptions, setCache } from './requestCache';

export interface IRequestOptions extends RequestInit {
  cacheOptions?: IRequestCacheOptions;
  user?: IAuthUser;
  domain?: string;
}

export interface IAPIData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IBaseAPIParameters {
  page_size?: number;
  page?: number;
  format?: 'json' | string;
}
/*
const makeRequest = (query: string, parameters: object = {}, options: RequestInit = {}) => {
  const queryString = toQueryString(parameters);
  return new Request(DOMAIN + query + queryString, options);
};
*/
const performRequest = async (query: string, parameters: object = {}, options: IRequestOptions = {}) => {
  const queryString = toQueryString(parameters);
  const { cacheOptions, user, domain, ...restOptions } = options;
  const url = (domain || DOMAIN) + query + queryString;
  if (hasCache({ url, options: cacheOptions })) {
    const { cache } = getCache({ url, options: cacheOptions });
    if (cache) {
      return cache.content;
    }
  }
  const headers = {
    ...options.headers,
    Authorization: options.user ? `Bearer ${options.user.access_token}` : '',
  };
  const requestOptions = { ...restOptions, headers };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  setCache({ content: data, options: cacheOptions, url });
  return data;
};

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @param {string} query API endpoint URL
 * @returns {Promise<any>} API data
 */
export const get = async (query: string, parameters: object = {}, options: IRequestOptions = {}): Promise<any> => {
  // const request = makeRequest(query, parameters, options);
  return performRequest(query, parameters, options);
};

/**
 * @summary Returns all pages of results from a standard REST API endpoint.
 * @param query The API endpoint to fetch results from.
 * @param page An optional page to start fetching data on.
 */
export async function getAllPages<T>(
  query: string,
  parameters: IBaseAPIParameters = {},
  options: IRequestOptions = {}
): Promise<T[]> {
  const { page = 1, page_size = 80 } = parameters;
  /** Get the amount of objects to get in total by fetching a single object */
  const { count }: IAPIData<T> = await get(query, { ...parameters, page, page_size: 1 }, options);
  /** Prepare an array with an index for each page which will be fetched */
  const pageNumber = Math.ceil(count / page_size);
  const requestCount = [...Array(pageNumber)];
  /** Initialize the fetches for all the pages at the same time */
  const requests = requestCount.map((_, i) => get(query, { ...parameters, page: i + 1, page_size }, options));
  /** Await all the fetches to a single array */
  const data: Array<IAPIData<T>> = await Promise.all(requests);
  /** Reduce all results to a single array for all objects in the resource */
  const results = data.reduce<T[]>((res, d) => res.concat(d.results), []);
  return results;
}

/**
 * @summary Simple fetch-API wrapper for HTTP POST
 * @param {string} query
 * @param {any} data
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const post = async (
  query: string,
  data: any,
  parameters: object = {},
  options: IRequestOptions = {}
): Promise<any> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'POST', body, headers };
  return performRequest(query, parameters, opts);
};

export interface IPutParams {
  query: string;
  data: any;
  parameters?: object;
  options?: IRequestOptions;
}

export const put = async (putParams: IPutParams): Promise<any> => {
  const { query, data, parameters = {}, options = {} } = putParams;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'PUT', body, headers };
  return performRequest(query, parameters, opts);
};
