import { get } from 'common/utils/api';
import { ISearchUser } from '../models/User';
import { SearchFilter } from '../models/Search';
import user from 'img/profile/user.png';

const API_URL = '/v1/users'

export const searchUsers = async (filter: SearchFilter): Promise<ISearchUser[]> => {
  //const { data } = await get(API_URL, { format: 'json', ...filter.format });
  const data:ISearchUser[] = [
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user }
  ]
  return data;
}
