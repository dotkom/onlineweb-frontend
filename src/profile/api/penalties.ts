import { get } from 'common/utils/api';
import { IUser } from 'core/models/User';
import { IMark, ISuspension } from '../models/Penalty';

const API_URL = '/api/v1/profile';

const userMock: IUser = {
  email: 'ola.nordmann@online.ntnu.no',
  first_name: 'Ola',
  last_name: 'Nordmann',
  groups: [],
  username: 'olanor',
};

const marksMock: IMark[] = [
  {
    added_date: '2018-05-11T19:00:00+01:00',
    category: 'Betaling',
    description: 'Du har fått en prikk fordi du ikke har betalt for et arrangement...',
    given_by: userMock,
    last_changed_by: userMock,
    last_changed_date: '2018-05-11T19:00:00+01:00',
    expiration_date: '2018-06-11T19:00:00+01:00',
    title: 'Prikk?',
  },
];

const suspensionsMock: ISuspension[] = [
  {
    active: true,
    added_date: '2018-07-11T19:00:00+01:00',
    description: 'Du har fått en suspensjon fordi ... ?',
    expiration_date: '2018-08-11T19:00:00+01:00',
    payment_id: 1,
    title: 'Suspensjon?',
    user: userMock,
  },
  {
    active: true,
    added_date: '2018-06-11T19:00:00+01:00',
    description: 'Du har fått en suspensjon fordi ... ?',
    expiration_date: '2018-07-11T19:00:00+01:00',
    payment_id: 1,
    title: 'Suspensjon?',
    user: userMock,
  },
  {
    active: true,
    added_date: '2018-05-11T19:00:00+01:00',
    description: 'Du har fått en suspensjon fordi ... ?',
    expiration_date: '2018-06-11T19:00:00+01:00',
    payment_id: 1,
    title: 'Suspensjon?',
    user: userMock,
  },
];

/**
 * @summary Fetch Marks from API.
 */
export const getMarks = async (): Promise<IMark[]> => {
  // const { marks } = await get(API_URL + '/marks', { format: 'json' })
  const marks = marksMock;
  return marks;
};

/**
 * @summary Fetch Suspensions from API.
 */
export const getSuspensions = async (): Promise<ISuspension[]> => {
  // const { suspensions } = await get(API_URL + '/suspensions', { format: 'json' })
  const suspensions = suspensionsMock;
  return suspensions;
};
