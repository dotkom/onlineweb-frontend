import { get } from 'common/utils/api';
import { IAuthUser } from 'core/models/User';
import { format } from 'path';

const API_URL = '/sso/openid'

const user: IAuthUser = {
  username: 'oleast',
  groups: [{ permissions: ['something'] }],
  email: 'oleast@stud.ntnu.no',
  field_of_study: 4
}

export const logIn = async (username: string, password: string): Promise<IAuthUser> => {
  //const { user } = await get(API_URL, { username, password });
  return user;
}