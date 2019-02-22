import { get, getAllPages, IAPIData } from 'common/utils/api';
import { IOfflineIssue } from '../models/Offline';

const API_URL = '/api/v1/offline/';

export const getOfflines = async (page: number = 1): Promise<IAPIData<IOfflineIssue>> => {
  return await get(API_URL, { format: 'json', page });
};

export const getRemaindingOfflines = (): Promise<IOfflineIssue[]> => {
  return getAllPages<IOfflineIssue>(API_URL, { page: 2 });
};
