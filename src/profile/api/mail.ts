import { get } from 'common/utils/api';
import { IMail } from '../models/Mail';

const API_URL = '/api/v1/profile'

/**
 * 
 */
export const getMails = async (): Promise<IMail[]> => {
  //const data = await get(API_URL + '/mails', { format: 'json' });
  const mails: IMail[] = [
    { email: 'ola.nordmann@online.ntnu.no', primary: false },
    { email: 'olanor@stud.ntnu.no', primary: false },
    { email: 'dragonslayer@1337.no', primary: true },
  ]
  return mails;
}
