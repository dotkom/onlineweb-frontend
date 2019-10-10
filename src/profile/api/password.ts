import { getUser } from 'authentication/api';
import { put } from 'common/utils/api';
import { IChangePasswordData, IChangePasswordResponse } from 'profile/models/Password';

const API_URL = '/api/v1/users/';

export const putPasswords = async (data: IChangePasswordData): Promise<IChangePasswordResponse | null> => {
  try {
    const user = await getUser();
    const response = await put<IChangePasswordResponse, IChangePasswordData>({
      query: API_URL + user.profile.sub + `/change_password`,
      data,
      options: { user },
    });
    return response;
  } catch {
    return null;
  }
};
