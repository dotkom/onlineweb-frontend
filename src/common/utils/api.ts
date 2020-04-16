import { DOMAIN } from '../constants/endpoints';
import { IQueryObject, toQueryString } from './queryString';

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

const performRequest = async (query: string, parameters: IQueryObject = {}, options: IRequestOptions = {}) => {
  const queryString = toQueryString(parameters);
  // User is pruned from the ..restOptions, which ESLint don't like if it is not being used by itself.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  if (response.status === 204) {
    return null;
  }
  // encountered a http error, throw error
  if(response.status > 399){
    console.error(response);
    throw response;
  }

  const data = await response.json();
  setCache({ content: data, options: cacheOptions, url });
  return data;
};

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @param {string} query API endpoint URL
 * @returns {Promise<T>} API data
 */
export const get = async <T>(
  query: string,
  parameters: IQueryObject = {},
  options: IRequestOptions = {}
): Promise<T> => {
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
  try {
    /** Get the amount of objects to get in total by fetching a single object */
    const { count }: IAPIData<T> = await get<IAPIData<T>>(query, { ...parameters, page, page_size: 1 }, options);
    /** Prepare an array with an index for each page which will be fetched */
    const pageNumber = Math.ceil(count / page_size);
    const requestCount = [...Array(pageNumber)];
    /** Initialize the fetches for all the pages at the same time */
    const requests = requestCount.map((_, i) =>
      get<IAPIData<T>>(query, { ...parameters, page: i + 1, page_size }, options)
    );
    /** Await all the fetches to a single array */
    const data: Array<IAPIData<T>> = await Promise.all(requests);
    /** Reduce all results to a single array for all objects in the resource */
    const results = data.reduce<T[]>((res, d) => res.concat(d.results), []);
    return results;
  } catch(response){
    return [];
  }
}

/**
 * @summary Simple fetch-API wrapper for HTTP POST
 * @param {string} query
 * @param {any} data
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const post = async <T>(
  query: string,
  data: T | {},
  parameters: IQueryObject = {},
  options: IRequestOptions = {}
): Promise<T> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'POST', body, headers };
  return performRequest(query, parameters, opts);
};

/**
 * @summary Simple fetch-API wrapper for HTTP DELETE
 * @param {string} query
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const deleteR = async <T>(
  query: string,
  parameters: IQueryObject = {},
  options: IRequestOptions = {}
): Promise<T> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const opts = { ...options, method: 'DELETE', headers };
  return performRequest(query, parameters, opts);
};

export interface IPutParams<T> {
  query: string;
  data: T;
  parameters?: IQueryObject;
  options?: IRequestOptions;
}

export const put = async <T, K = Partial<T>>(putParams: IPutParams<K>): Promise<T> => {
  const { query, data, parameters = {}, options = {} } = putParams;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'PUT', body, headers };
  return performRequest(query, parameters, opts);
};

export const patch = async <T, K = Partial<T>>(patchParams: IPutParams<K>): Promise<T> => {
  const { query, data, parameters = {}, options = {} } = patchParams;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'PATCH', body, headers };
  return performRequest(query, parameters, opts);
};
