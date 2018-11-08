import nodeFetch from 'node-fetch';
import { DOMAIN } from '../constants/endpoints';
import { __CLIENT__ } from '../constants/environment';
import { toQueryString } from './queryString';

import { IAuthUser } from 'authentication/models/User';

export interface IAPIData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IBaseAPIParameters {
  page_size?: number;
  page?: number;
}

const makeRequest = (query: string, parameters: object = {}, options: RequestInit = {}) => {
  const queryString = toQueryString(parameters);
  return new Request(DOMAIN + query + queryString, options);
};

const performRequest = async (request: Request) => {
  const respons = await universalFetch(request);
  return respons.json();
};

export const withUser = (user: IAuthUser, options: RequestInit = {}): RequestInit => {
  const token = user.access_token;
  const headers = Object.assign(options.headers || {}, {
    Authorization: `Bearer ${token}`,
  });
  return Object.assign(options, {
    headers,
  });
};

/** TODO: Why are these not the same type?! */
export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
/** Force fetch and node-fetch to have the same typing */
const universalFetch: Fetch = __CLIENT__ ? fetch : nodeFetch as any as Fetch;

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @param {string} query API endpoint URL
 * @returns {Promise<any>} API data
 */
export const get = async (query: string, parameters: object = {}, options: RequestInit = {}): Promise<any> => {
  const request = makeRequest(query, parameters, options);
  return performRequest(request);
};

/**
 * @summary Returns all pages of results from a standard REST API endpoint.
 * @param query The API endpoint to fetch results from.
 * @param page An optional page to start fetching data on.
 */
export async function getAllPages<T>(
  query: string,
  parameters: IBaseAPIParameters = {},
  options: RequestInit = {}
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
 * TODO: implement Request options, Done with Object.assign, not tested yet
 * @param {string} query
 * @param {any} data
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const post = async (
  query: string,
  data: any,
  parameters: object = {},
  options: RequestInit = {}
): Promise<any> => {
  const request = makeRequest(
    query,
    parameters,
    Object.assign(options, {
      methods: 'POST',
      body: JSON.stringify(data),
    })
  );
  return performRequest(request);
};
