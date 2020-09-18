import { get, IAPIData } from 'common/utils/api';

import { IMark, ISuspension } from '../models/Penalty';
import { getUser } from 'authentication/api';

const API_URL = '/api/v1/profile';
const MARKS_URL = API_URL + '/marks/';
const SUSPENSIONS_URL = API_URL + '/suspensions/';

/**
 * @summary Fetch Marks from API.
 */
export const getMarks = async (): Promise<IMark[]> => {
  const user = await getUser();
  const { results } = await get<IAPIData<IMark>>(MARKS_URL, { format: 'json' }, { user });
  return results;
};

/**
 * @summary Fetch Suspensions from API.
 */
export const getSuspensions = async (): Promise<ISuspension[]> => {
  const user = await getUser();
  const { results } = await get<IAPIData<ISuspension>>(SUSPENSIONS_URL, { format: 'json' }, { user });
  return results;
};
