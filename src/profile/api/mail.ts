import { getUser } from 'authentication/api';
import { get, IAPIData, patch } from 'common/utils/api';

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
    query: `${API_URL}/${addressId}/`,
    data,
    parameters: { format: 'json' },
    options: { user },
  });

  return response;
};
