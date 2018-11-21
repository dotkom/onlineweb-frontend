import { DOMAIN } from '../constants/endpoints';
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
  const respons = await fetch(request);
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
  let data: IAPIData<T>;
  let results: T[] = [];
  let page = parameters.page || 1;
  do {
    data = await get(query, { ...parameters, page }, options);
    results = [...results, ...data.results];
    page += 1;
  } while (data.next);
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
