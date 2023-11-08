import { IAPIData, IBaseAPIParameters, get } from 'common/utils/api';

import { ICommitteeUpdate } from 'committeeupdates/models/CommitteeUpdate';
import { IQueryObject } from 'common/utils/queryString';
import { listResource } from 'common/resources';

export interface ICommitteeUpdatesParameters extends IBaseAPIParameters {}

export interface ICommitteeUpdateAPIParameters extends IQueryObject {}

const API_URL = '/api/v1/committeeupdates';

export const listCommitteeUpdates = listResource<ICommitteeUpdate, ICommitteeUpdateAPIParameters>(API_URL);

export const getCommitteeUpdates = async (args?: ICommitteeUpdatesParameters): Promise<ICommitteeUpdate[]> => {
  const data: IAPIData<ICommitteeUpdate> = await get(API_URL, { format: 'json', ...args });
  return data.results;
};
