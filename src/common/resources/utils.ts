import { getUser } from 'authentication/api';
import { DOMAIN } from 'common/constants/endpoints';

import { HEADERS } from './defaults';
import { ResponseType } from './types';

export const handleReadOnlyResponse = async <InputData, OutputData>(
  response: Response
): Promise<ResponseType<InputData, OutputData>> => {
  if (response.ok) {
    return {
      status: 'success',
      data: await response.json(),
    };
  } else {
    return {
      status: 'error',
      errors: await response.json(),
    };
  }
};

export const handleResponse = async <InputData, OutputData>(
  response: Response
): Promise<ResponseType<InputData, OutputData>> => {
  if (response.ok) {
    if (response.status === 204) {
      return {
        status: 'success',
        // WARNING!
        // Handle no-content responses as null.
        // This is kind of dangerous, since null has to be defined as OutputData
        // When the resouce is created.
        // TODO: Refactor and properly handle null.
        data: (null as unknown) as OutputData,
      };
    } else {
      return {
        status: 'success',
        data: await response.json(),
      };
    }
  } else if (response.status === 400) {
    return {
      status: 'invalid',
      errors: await response.json(),
    };
  } else {
    return {
      status: 'error',
      errors: await response.json(),
    };
  }
};

export const getHeaders = async () => {
  try {
    const user = await getUser();
    if (user) {
      return {
        ...HEADERS,
        Authorization: `Bearer ${user.access_token}`,
      };
    }
    return HEADERS;
  } catch {
    return HEADERS;
  }
};

const ABSOULTE_URL_REGEXP = new RegExp('^(?:[a-z]+:)?//', 'i');

export const buildUrl = (url: string) => {
  const baseUrl = ABSOULTE_URL_REGEXP.test(url) ? '' : `${DOMAIN}`;
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}${url.endsWith('/') ? '' : '/'}`;
};
