import { get, IAPIData } from 'common/utils/api';

import { IMark, IMarkRule, ISuspension } from '../models/Penalty';
import { getUser } from 'authentication/api';

const BASE_API_URL = '/api/v1';
const API_URL = BASE_API_URL + '/profile';
const MARKS_URL = API_URL + '/marks/';
const MARK_RULES_URL = BASE_API_URL + '/marks/rule-sets/';
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
 * @summary Fetch Mark Rules from API.
 */
export const getMarkRules = async (): Promise<IMarkRule[]> => {
  const { results } = await get<IAPIData<IMarkRule>>(MARK_RULES_URL, { format: 'json' });
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
