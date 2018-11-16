import user from 'common/img/profile/user.png';
import { SearchFilter } from '../models/Search';
import { ISearchUser } from '../models/User';

export const searchUsers = async (_: SearchFilter): Promise<ISearchUser[]> => {
  // const { data } = await get(API_URL, { format: 'json', ...filter.format });
  const data: ISearchUser[] = [
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
    { name: 'Kari Nordmann', phone: '98765432', mail: 'karinor@stud.ntnu.no', image: user },
  ];
  return data;
};
