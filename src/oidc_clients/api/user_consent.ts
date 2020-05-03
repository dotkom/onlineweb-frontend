// api for fetching user clients
import { IAuthUser } from 'authentication/models/User';
import { deleteR, getAllPages } from 'common/utils/api';
import { IOidcClient } from 'oidc_clients/models/client';
import { IUserConsent } from '../models/user_consent';
import { getClient } from './clients';

const API_BASE = '/api/v1/oidc/';

type ConsentResponseType = { client: number | IOidcClient } & Omit<IUserConsent, 'client'>;

export const getUserConsent = async (user: IAuthUser) => {
  let consentResponse = [];
  try {
    consentResponse = await getAllPages<ConsentResponseType>(API_BASE + 'consent/', undefined, { user });
  } catch (response) {
    throw new Error(`Kunne ikke hente apptilganger: ${response.statusText}`);
  }
  const promises = consentResponse.map(async (consent) => {
    consent.client = await getClient(consent.client as number);
    return consent as IUserConsent;
  });

  return await Promise.all(promises);
};

export const revokeuserConsent = (user: IAuthUser, id: number) => {
  try {
    return deleteR(`${API_BASE}consent/${id}`, undefined, { user });
  } catch (response) {
    throw new Error(`Kunne ikke trekke tilbake apptilgang: ${response.statusText}`);
  }
};
