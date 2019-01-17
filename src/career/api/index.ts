import { ICareerOpportunity, IEmployment, ILocation, ISelectable, TagTypes } from 'career/models/Career';
import { get, IAPIData } from 'common/utils/api';
import { IApiCompany } from 'core/models/Company';

const API_URL = '/api/v1/career/';

/** All selectable tags are wrapped in an ISelectable object */
export type FilterJobs = [
  ICareerOpportunity[],
  Array<ISelectable<IApiCompany>>,
  Array<ISelectable<IEmployment>>,
  Array<ISelectable<ILocation>>
];

export const getCareerOpportunities = async (): Promise<FilterJobs> => {
  const { results }: IAPIData<ICareerOpportunity> = await get(API_URL, { format: 'json' });
  return configureFilters(results);
};

/**
 * @summary Prepares the jobs from the API for usage in the filterable list.
 * @description Creates the tags which are needed for filtering jobs in the list. All are:
 * - Mapped to the correct type.
 * - Filtered to remove duplicate values.
 * - Sorted so the representation will not change when the list if changed.
 * - Mapped to be wrapped in a selectable container, which marks if the tag has been selected.
 * @param {ICareerOpportunity[]} jobs Career opportunities fetched from the API.
 * @returns {FilterJobs} All the jobs, and the configured selectable tags.
 */
const configureFilters = (jobs: ICareerOpportunity[]): FilterJobs => {
  const companies = jobs
    .map((job) => job.company)
    .filter(removeDuplicates)
    .sort(sortTags)
    .map(addSelectable) as Array<ISelectable<IApiCompany>>;
  const jobTypes = jobs
    .map((job) => job.employment)
    .filter(removeDuplicates)
    .sort(sortTags)
    .map(addSelectable) as Array<ISelectable<IEmployment>>;
  const locations = jobs
    .flatMap((job) => job.location)
    .filter(removeDuplicates)
    .sort(sortTags)
    .map(addSelectable) as Array<ISelectable<ILocation>>;
  return [jobs, companies, jobTypes, locations];
};

/** Sorting expects a number, comparison returns a boolean. This makes Typescript happy */
const sortTags = (a: TagTypes, b: TagTypes) => (a.name > b.name ? 1 : -1);

/** Wrap a TagType in a selectable container */
const addSelectable = (tag: TagTypes): ISelectable<TagTypes> => {
  return { value: tag, selected: false };
};

/** Removes all duplicate TagType objects from a list of a given TagType */
const removeDuplicates = (tag: TagTypes, i: number, all: TagTypes[]): boolean => {
  return all.map((arr) => arr.name).indexOf(tag.name) === i;
};

/** Fetch a single career opportunity */
export const getCareerOpportunity = async (id: number): Promise<ICareerOpportunity> => {
  const data: ICareerOpportunity = await get(API_URL + id, { format: 'json', mode: 'no-cors' });
  return data;
};
