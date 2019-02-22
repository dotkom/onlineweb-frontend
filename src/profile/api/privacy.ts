import { IAuthUser } from 'authentication/models/User';
import { get, put } from 'common/utils/api';
import { IPrivacy } from '../models/Privacy';

const API_URL = '/api/v1/profile/privacy/';

/**
 * @returns {IPrivacy} Privacy options for a logged in OnlineUser.
 */
export const getPrivacyOptions = async (user: IAuthUser): Promise<IPrivacy> => {
  const data = await get(API_URL, { format: 'json' }, { user });
  return data;
};

/**
 * @summary Post privacy options, get back what they are updated to.
 * @param {IPrivacy} privacyOptions Changed Privacy options for a user.
 * @returns {IPrivacy} The current state of OnlineUsers Privacy options.
 */
export const putPrivacyOptions = async (privacyOptions: IPrivacy, user: IAuthUser): Promise<IPrivacy> => {
  const data = await put({ query: API_URL, data: privacyOptions, options: { user } });
  return data;
};
