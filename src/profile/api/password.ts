import { IAuthUser } from 'authentication/models/User';
import { put } from 'common/utils/api';
import { IChangePasswordData } from 'profile/models/Password';
import { getUser } from 'authentication/api';

const API_URL = '/api/v1/users';

export const putPasswords = async (data: IChangePasswordData) => {
  const user = await getUser();
  const response = await put<IChangePasswordData>({ query: API_URL + user.profile.sub, data, options: { user } });
  return response;
};
