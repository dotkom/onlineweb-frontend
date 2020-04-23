import { retrieveResource } from 'common/resources';
import { ICompany } from 'core/models/Company';

const API_URL = '/api/v1/companies';

export const retrieveCompany = retrieveResource<ICompany>(API_URL);
