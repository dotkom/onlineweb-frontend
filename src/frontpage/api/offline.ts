import { get, IAPIData } from "common/utils/api";
import { IOfflineIssue } from '../models/Offline';

const API_URL = '/api/v1/offline/';

export const getOfflines = async (page: number = 0): Promise<IOfflineIssue[]> => {
  const res: IAPIData<IOfflineIssue> = await get(API_URL, { format: 'json', page })
  return res.results;
};
