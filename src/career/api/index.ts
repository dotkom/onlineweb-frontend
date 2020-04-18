import { ICareerOpportunity, IEmployment, ILocation, TagTypes } from 'career/models/Career';
import { listResource, retrieveResource } from 'common/resources';
import { IQueryObject } from 'common/utils/queryString';
import { ICompany } from 'core/models/Company';

const API_URL = '/api/v1/career/';

/** All selectable tags are wrapped in an ISelectable object */
export type FilterJobs = [ICareerOpportunity[], ICompany[], IEmployment[], ILocation[]];

interface IFilters extends IQueryObject {
  query?: string;
  location?: string;
  location__in?: string | string[];
  start__gte?: string;
  start__lte?: string;
  end__gte?: string;
  end__lte?: string;
  deadline__gte?: string;
  deadline__lte?: string;
  company?: number;
  company__in?: number | number[];
  employment?: number;
  employment__in?: number | number[];
}

export const listCareerOpportunities = listResource<ICareerOpportunity, IFilters>(API_URL);

export const getCareerOpportunities = async (filters: IFilters = {}) => {
  const response = await listCareerOpportunities(filters);
  if (response.status === 'success') {
    return configureFilters(response.data.results);
  }
  return configureFilters([]);
};

/**
 * @summary Prepares the jobs from the API for usage in the filterable list.
 * @description Creates the tags which are needed for filtering jobs in the list. All are:
 * - Mapped to the correct type.
 * - Filtered to remove duplicate values.
 * @param {ICareerOpportunity[]} jobs Career opportunities fetched from the API.
 * @returns {FilterJobs} All the jobs, and the configured selectable tags.
 */
const configureFilters = (jobs: ICareerOpportunity[]): FilterJobs => {
  const companies = jobs.map((job) => job.company).filter(removeDuplicates);
  const jobTypes = jobs.map((job) => job.employment).filter(removeDuplicates);
  const locations = jobs.flatMap((job) => job.location).filter(removeDuplicates);
  return [jobs, companies, jobTypes, locations];
};

/** Removes all duplicate TagType objects from a list of a given TagType */
const removeDuplicates = (tag: TagTypes, i: number, all: TagTypes[]): boolean => {
  return all.map((arr) => arr.name).indexOf(tag.name) === i;
};

export const retrieveCareerOpportunity = retrieveResource<ICareerOpportunity>(API_URL);
