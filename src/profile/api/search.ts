import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';

import { ISearchUser } from '../models/User';

export interface IUserSearchParameters extends IBaseAPIParameters {
  search: string;
  group?: string;
  range: [number, number];
}

const API_URL = '/api/v1/profile/search/';

export const searchUsers = async (params: IUserSearchParameters): Promise<ISearchUser[]> => {
  const { results = [] }: IAPIData<ISearchUser> = await get(API_URL, { format: 'json', ...params });
  return results;
};
