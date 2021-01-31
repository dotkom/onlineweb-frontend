import { get } from 'common/utils/api';
import { getUser } from 'authentication/api';
import { IMembershipApplication, IMembershipResponse } from 'profile/models/Membership';

const API_URL = '/api/v1/membership-application/';

const isMembershipApplication = (obj: any): obj is IMembershipApplication => {
  return true;
};

export const getMembershipStatus = async (): Promise<IMembershipApplication | undefined> => {
  const user = await getUser();

  if (user) {
    const { results } = await get<IMembershipResponse>(API_URL, { format: 'json' }, { user });
    const userResult = results[0];
    if (isMembershipApplication(userResult)) {
      return userResult;
    } else {
      return undefined;
    }
  }
  return undefined;
};
