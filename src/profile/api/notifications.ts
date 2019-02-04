import { IAuthUser } from 'authentication/models/User';
import { post } from 'common/utils/api';

export const subscribe = async (sub: PushSubscription, user: IAuthUser) => {
  const json = sub.toJSON();
  await post('/user/subscribe', json, {}, { user, domain: 'http://localhost:8081' });
};
