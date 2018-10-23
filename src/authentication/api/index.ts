import { get } from 'common/utils/api';
import { IAuthUser } from '../models/User';
import { DOMAIN } from 'common/constants/endpoints';
import settings from './settings';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

const API_URL = '/sso/openid';

const SSO_CLIENT_ID = '181001';

const SSO_REDIRECT_URI = DOMAIN + '/auth-callback';
const SSO_LOGOUT_REDIRECT_URI = DOMAIN;
const SSO_RESPONSE_TYPE = 'id_token token';

const MANAGER = new UserManager(settings);

const a: any = {
  scope: 'openid profile',
  filterProtocolClaims: true,
  loadUserInfo: true
};

const o_user: IAuthUser = {
  first_name: 'Kari',
  last_name: 'Nordmann',
  username: 'karinor',
  groups: [{
    name: 'dotkom',
    permissions: ['onlineweb4.events.edit']
  }],
  email: 'karinor@stud.ntnu.no',
  field_of_study: 4,
  permissions: ['']
}

export const logIn = async (username: string, password: string): Promise<IAuthUser> => {
  //const { user } = await get(API_URL, { username, password });
  console.log('getting user')
  try {
    const user = await MANAGER.getUser()
    MANAGER.signinRedirect();
    //const OnlineUser = { ...o_user, ...user }
    console.log(user);
  } catch (e) {
    console.error(e);
  }
  return o_user;
}

export const authCallback = async (): Promise<User> => {
  const user = await MANAGER.signinRedirectCallback();
  console.log(user);
  return user;
}
