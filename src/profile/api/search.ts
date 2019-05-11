import { IAuthUser } from 'authentication/models/User';
import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';

import { IPublicProfile } from '../models/User';

export interface IUserSearchParameters extends IBaseAPIParameters {
  search?: string;
  group?: string;
  range: [number, number];
}

const API_URL = '/api/v1/profile/search/';

export const searchUsers = async (params: IUserSearchParameters, user: IAuthUser) => {
  const request = await get<IAPIData<IPublicProfile>>(API_URL, { format: 'json', ...params }, { user });
  return request;
};

export const getPublicProfile = async (profileId: number, user: IAuthUser) => {
  const profile = await get<IPublicProfile>(API_URL + profileId, { format: 'json' }, { user });
  return profile;
};

export async function* getProfilesIterator({ search, group, range }: IUserSearchParameters, user: IAuthUser) {
  /** Fetch the first page of profiles, to set the count and init the generator loop */
  const { count, results: initialProfiles } = await searchUsers({ search, group, range, page: 1 }, user);
  yield initialProfiles;

  /** Loop through and yield the remaining pages of profiles one by one */
  const pageSize = 10;
  const startPage = 2;
  const pageCount = Math.ceil(count / pageSize);
  for (let i = startPage; i < pageCount; i++) {
    const { results: nextProfiles } = await searchUsers({ search, group, range, page: i }, user);
    yield nextProfiles;
  }

  return;
}
