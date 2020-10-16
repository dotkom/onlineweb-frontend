import { getUser } from 'authentication/api';
import { get, IAPIData, patch, deleteR, post } from 'common/utils/api';

import { IMail } from '../models/Mail';

const API_URL = '/api/v1/user/emails/';
/**
 *
 */
export const getMails = async (): Promise<IMail[]> => {
  const user = await getUser();
  const data = await get<IAPIData<IMail>>(API_URL, { format: 'json' }, { user });
  return data.results;
};

export const patchMails = async (addressId: number, data: Partial<IMail>): Promise<IMail> => {
  const user = await getUser();
  const response = await patch<IMail, Partial<IMail>>({
    query: `${API_URL}${addressId}/`,
    data,
    parameters: { format: 'json' },
    options: { user },
  });

  return response;
};

export const deleteMail = async (mailId: number) => {
  const user = await getUser();
  try {
    const ret = await deleteR(`${API_URL}${mailId}`, undefined, { user });
    return ret;
  } catch (err) {
    throw new Error(`Kunne ikke slette mail ${err.statusText}`);
  }
};

export const postMail = async (mail: Partial<IMail>) => {
  const user = await getUser();
  try {
    const res = await post<IMail>(API_URL, mail, undefined, { user });
    return res;
  } catch (err) {
    throw new Error(`Kunne ikke legge til ny mail ${err.statusText}`);
  }
};
