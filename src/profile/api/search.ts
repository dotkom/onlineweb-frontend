import { IAuthUser } from 'authentication/models/User';
import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';

import { ISearchUser } from '../models/User';

export interface IUserSearchParameters extends IBaseAPIParameters {
  search: string;
  group?: string;
  range: [number, number];
}

const API_URL = '/api/v1/profile/search/';

export const searchUsers = async (params: IUserSearchParameters, user: IAuthUser): Promise<ISearchUser[]> => {
  const { results = [] }: IAPIData<ISearchUser> = await get(API_URL, { format: 'json', ...params }, { user });
  return results;
};

export const publicProfile = async (userId: number, user: IAuthUser): Promise<ISearchUser> => {
  const profile = await get(API_URL + userId, { format: 'json' }, { user });
  return profile;
};
