import { IQueryObject, toQueryString } from '../utils/queryString';
import { QUERY_PARAMETERS } from './defaults';
import { IBaseListResourceQueryParams, IListResourceWrapper, ResponseType } from './types';
import { buildUrl, getHeaders, handleReadOnlyResponse, handleResponse } from './utils';

export const retrieveResource = <OutputData>(url: string, options?: RequestInit) => {
  return async (id: number | string): Promise<ResponseType<never, OutputData>> => {
    const response = await fetch(`${buildUrl(url)}${id}/`, {
      method: 'GET',
      headers: await getHeaders(),
      ...options,
    });

    const data = await handleReadOnlyResponse<never, OutputData>(response);
    return data;
  };
};

export const listResource = <OutputData, QueryParams extends IQueryObject = {}>(url: string, options?: RequestInit) => {
  type ResponseData = ResponseType<never, IListResourceWrapper<OutputData>>;
  type AllQueryParams = QueryParams & IBaseListResourceQueryParams;
  return async (queryParams?: AllQueryParams): Promise<ResponseData> => {
    const queryString = toQueryString({
      ...QUERY_PARAMETERS,
      ...queryParams,
    });

    const response = await fetch(`${buildUrl(url)}${queryString}`, {
      method: 'GET',
      headers: await getHeaders(),
      ...options,
    });

    const data = await handleReadOnlyResponse<never, IListResourceWrapper<OutputData>>(response);
    return data;
  };
};

export const createResource = <InputData, OutputData>(url: string, options?: RequestInit) => {
  return async (inputData: InputData): Promise<ResponseType<InputData, OutputData>> => {
    const response = await fetch(buildUrl(url), {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(inputData),
      ...options,
    });

    const data = await handleResponse<InputData, OutputData>(response);
    return data;
  };
};

export const updateResource = <InputData, OutputData>(url: string, options?: RequestInit) => {
  return async (id: number | string, inputData: InputData): Promise<ResponseType<InputData, OutputData>> => {
    const response = await fetch(`${buildUrl(url)}${id}/`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(inputData),
      ...options,
    });

    const data = await handleResponse<InputData, OutputData>(response);
    return data;
  };
};

export const destroyResource = (url: string, options?: RequestInit) => {
  return async (id: number | string): Promise<ResponseType<never, null>> => {
    const response = await fetch(`${buildUrl(url)}${id}/`, {
      method: 'DELETE',
      headers: await getHeaders(),
      ...options,
    });

    const data = await handleResponse<never, null>(response);
    return data;
  };
};

/**
 * A partial update follows the same API as an update with the exception of taking a partial of the InputData and using the `PATCH` method instead of `PUT`.
 */
export const partialUpdateResource = <InputData, OutputData>([url, options, ...args]: Parameters<
  typeof updateResource
>) => updateResource<Partial<InputData>, OutputData>(url, { ...options, method: 'PATCH' }, ...args);
