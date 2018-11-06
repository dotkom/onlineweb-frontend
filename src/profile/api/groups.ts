import { get } from 'common/utils/api';
import { IGroup } from 'core/models/Group';

const API_URL = '/v1/groups';

export const getGroups = async (): Promise<IGroup[]> => {
  // const { data } = await get(API_URL, { format: 'json' }) as { data: IGroup[] }
  const data: IGroup[] = [
    { name: 'Alle grupper', permissions: [''] },
    { name: 'arrkom', permissions: [''] },
    { name: 'bedkom', permissions: [''] },
    { name: 'bankom', permissions: [''] },
    { name: 'dotkom', permissions: [''] },
    { name: 'fagkom', permissions: [''] },
    { name: 'hovedstyret', permissions: [''] },
    { name: 'prokom', permissions: [''] },
    { name: 'seniorkom', permissions: [''] },
    { name: 'trikom', permissions: [''] },
  ];
  return data;
};
