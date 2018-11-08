import { get, getAllPages, IAPIData } from 'common/utils/api';
import { get, IAPIData } from 'common/utils/api';
import { getStateCache } from 'common/utils/stateCacheResolver';
import { IOfflineIssue } from '../models/Offline';

const API_URL = '/api/v1/offline/';

export const getOfflines = async (page: number = 1): Promise<IAPIData<IOfflineIssue>> => {
  return await get(API_URL, { format: 'json', page });
};

export const getRemaindingOfflines = (): Promise<IOfflineIssue[]> => {
  return getAllPages<IOfflineIssue>(API_URL, { page: 2 });
};

export const getServerCacheOfflines = (): IOfflineIssue[] => {
  const cache = getStateCache();
  return cache && cache.offline || [];
};
