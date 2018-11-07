import { RequestOptions } from 'http';
import { DOMAIN } from '../constants/endpoints';
import { toQueryString } from './queryString';

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

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @param {string} query API endpoint URL
 * @returns {Promise<any>} API data
 */
export const get = async (query: string, parameters: object = {}, options?: RequestInit): Promise<any> => {
  const queryString = toQueryString(parameters);
  try {
    const response = await fetch(DOMAIN + query + queryString, options);
    const json = await response.json();
    return json;
  } catch (error) {
    /* tslint:disable-next-line: no-console */
    console.error(error);
  }
};

/**
 * @summary Returns all pages of results from a standard REST API endpoint.
 * @param query The API endpoint to fetch results from.
 * @param page An optional page to start fetching data on.
 */
export const getAllPages = async (query: string, page:number = 1): Promise<any> => {
  let data:IAPIData<any>;
  let results:any[] = [];

  do {
    data = await get(query, { format: 'json', page: page });
    results = [...results, ...data.results];
    page += 1;
  } while (data.next);

  return results;
};

/**
 * @summary Simple fetch-API wrapper for HTTP POST
 * TODO: implement Request options, Done with Object.assign, not tested yet
 * @param {string} query
 * @param {any} data
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const post = async (query: string, data: any, parameters: object = {}, options?: RequestInit): Promise<any> => {
  const queryString = toQueryString(parameters);
  try {
    const response = await fetch(
      DOMAIN + query + queryString,
      Object.assign(options || {}, { method: 'POST', body: JSON.stringify(data) })
    );
    const json = await response.json();
    return json;
  } catch (error) {
    /* tslint:disable-next-line: no-console */
    console.error(error);
  }
};
