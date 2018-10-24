import { get, post } from 'common/utils/api';
import { IPrivacy } from '../models/Privacy';

const API_URL = '/api/v1/profile/privacy';

const privacyMock: IPrivacy = {
  expose_address: false,
  expose_email: false,
  expose_nickname: false,
  expose_phone_number: false,
  visible_for_other_users: false,
};

const setMockPrivacy = async (privacy: IPrivacy): Promise<IPrivacy> => {
  localStorage.setItem('privacy', JSON.stringify(privacy));
  return await getMockPrivacy();
};

const getMockPrivacy = async (): Promise<IPrivacy> => {
  await setTimeout(() => {}, 1000); // tslint:disable-line no-empty
  const data = localStorage.getItem('privacy');
  return JSON.parse(data || '');
};

/**
 * @returns {IPrivacy} Privacy options for a logged in OnlineUser.
 */
export const getPrivacyOptions = async (): Promise<IPrivacy> => {
  // const { data } = await get(API_URL, { format: 'json' })
  const data = getMockPrivacy();
  return data;
};

/**
 * @summary Post privacy options, get back what they are updated to.
 * @param {IPrivacy} privacyOptions Changed Privacy options for a user.
 * @returns {IPrivacy} The current state of OnlineUsers Privacy options.
 */
export const postPrivacyOptions = async (privacyOptions: IPrivacy): Promise<IPrivacy> => {
  // const { data } = await post(API_URL, privacyOptions, { format: 'json' })
  const data = await setMockPrivacy(privacyOptions);
  return data;
};

setMockPrivacy(privacyMock);
