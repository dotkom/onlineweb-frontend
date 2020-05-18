import { retrieveResource, listResource } from 'common/resources';
import { ICompany } from 'companies/models/Company';
import { IQueryObject } from 'common/utils/queryString';

const API_URL = '/api/v1/companies';

export interface ICompanyParams extends IQueryObject {
  query?: string;
  name?: string;
}

export const listCompanies = listResource<ICompany, ICompanyParams>(API_URL);

export const retrieveCompany = retrieveResource<ICompany>(API_URL);
