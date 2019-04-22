import { IAuthUser } from 'authentication/models/User';
import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';

import { IPublicProfile } from '../models/User';

export interface IUserSearchParameters extends IBaseAPIParameters {
  search: string;
  group?: string;
  range: [number, number];
}

const API_URL = '/api/v1/profile/search/';

export const searchUsers = async (params: IUserSearchParameters, user: IAuthUser) => {
  const { results = [] } = await get<IAPIData<IPublicProfile>>(API_URL, { format: 'json', ...params }, { user });
  return results;
};

export const getPublicProfile = async (profileId: number, user: IAuthUser) => {
  const profile = await get<IPublicProfile>(API_URL + profileId, { format: 'json' }, { user });
  return profile;
};
