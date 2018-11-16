import { ICareerOpportunity, IEmployment, ILocation, ISelectable, TagTypes } from 'career/models/Career';
import { get, IAPIData } from 'common/utils/api';
import { IApiCompany } from 'core/models/Company';

const API_URL = '/api/v1/career/';

export type FilterJobs = [
  ICareerOpportunity[],
  Array<ISelectable<IApiCompany>>,
  Array<ISelectable<IEmployment>>,
  Array<ISelectable<ILocation>>
]

export const getCareerOpportunities = async (): Promise<FilterJobs> => {
  const { results }: IAPIData<ICareerOpportunity> = await get(API_URL, { format: 'json', mode: 'no-cors' });
  return configureFilters(results);
};

const configureFilters = (jobs: ICareerOpportunity[]): FilterJobs => {
  const companies = jobs.map((job) => job.company)
                        .filter(removeDuplicates)
                        .sort(sortTags)
                        .map(addSelectable) as Array<ISelectable<IApiCompany>>;
  const jobTypes = jobs.map((job) => job.employment)
                       .filter(removeDuplicates)
                       .sort(sortTags)
                       .map(addSelectable) as Array<ISelectable<IEmployment>>;
  const locations = jobs.flatMap((job) => job.location)
                        .filter(removeDuplicates)
                        .sort(sortTags)
                        .map(addSelectable) as Array<ISelectable<ILocation>>;
  return [jobs, companies, jobTypes, locations];
};

const sortTags = (a: TagTypes, b: TagTypes) => a.name > b.name ? -1 : 1;

const addSelectable = (tag: TagTypes): ISelectable<TagTypes> => {
  return ({ value: tag, selected: false });
}

const removeDuplicates = (tag: TagTypes, i: number, all: TagTypes[]): boolean => {
  return all.map((arr) => arr.name).indexOf(tag.name) === i;
}

export const getCareerOpportunity = async (id: number): Promise<ICareerOpportunity> => {
  const data: ICareerOpportunity = await get(API_URL + id, { format: 'json', mode: 'no-cors' });
  return data;
};
