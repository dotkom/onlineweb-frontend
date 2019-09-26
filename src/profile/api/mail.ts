import { IMail } from '../models/Mail';
import { get, IAPIData } from 'common/utils/api';
import { getUser } from 'authentication/api';

const API_URL = '/api/v1/user/emails/';
/**
 *
 */
export const getMails = async (): Promise<IMail[]> => {
  const user = await getUser();
  const data = await get<IAPIData<IMail>>(API_URL, { format: 'json' }, { user });
  return data.results;
};
