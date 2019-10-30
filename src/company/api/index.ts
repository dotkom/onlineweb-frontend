import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';
import { ICompany } from '../models/Company';

export interface ICompanyAPIParameters extends IBaseAPIParameters {
  name?: string;
  website?: string;
  query?: string;
}

const API_URL = '/api/v1/companies/';

export const getCompanies = async (args?: ICompanyAPIParameters): Promise<ICompany[]> => {
  const data: IAPIData<ICompany> = await get(API_URL, { format: 'json', ...args });
  return data.results;
};

export const getCompany = async (id: number): Promise<ICompany> => {
  return await get(API_URL + id + '/', { format: 'json' });
};
