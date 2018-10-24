import { get } from 'common/utils/api';
import { IApiCompany } from 'core/models/Company';
import { IApiJob, IJob } from '../models/Job';
import { ITags, ITag } from '../models/Tag';
import moment from 'moment';

const API_URL = '/api/v1/career/';

export const getCareerOpportunities = async () => {
  const data = await get(API_URL, { format: 'json', mode: 'no-cors' });
  return loadData(data);
};

/**
 *
 * @param {ANY} data Can't continue this 'ANY' shit...
 * @returns { Random ass object }
 */
const loadData = (data: any) => {
  const companies: any[] = [];
  const locations: any[] = [];
  const jobTypes: any[] = [];
  const jobs: any[] = [];
  data.results.forEach((job: IApiJob) => {
    // Create a new company tag if it does not already exist.
    if (companies.indexOf(job.company.name) < 0) { // TODO: this kind of needs a rewrite
      companies.push(job.company);
    }

    // Create a new employment tag if the employeer does not exist.
    if (jobTypes.indexOf(job.employment.name) < 0) {
      jobTypes.push(job.employment);
    }

    // Create tags for all non-existing locations in the job.
    job.location.forEach((location) => {
      if (locations.indexOf(location.name) < 0) {
        locations.push(location.name);
      }
    });

    // Add information to the job that is used to filter using tags.
    jobs.push(Object.assign({}, { tags: {
      companies: job.company.id,
      jobTypes: job.employment.id,
      locations: job.location.map((location) => location.name),
    } }, normalizeData(job)));
  });

  // Update the tags with new information from the server.
  // Deadlines are not updated here as they're specified in the initial state.
  const tags: ITags = {
    companies: {},
    locations: {},
    jobTypes: {},
  };

  companies.forEach((company) => {
    tags.companies[company.id] = { id: company.id, display: false, name: company.name };
  });

  jobTypes.forEach((jobType) => {
    tags.jobTypes[jobType.id] = { id: jobType.id, display: false, name: jobType.name };
  });

  locations.forEach((location, i) => {
    tags.locations[i] = { id: i, display: false, name: location };
  });
  return { jobs, tags };

  // Store a copy of the tags for use in the reset button.
  // this.defaultTags = JSON.stringify(this.state.tags);
};

// Normalizes data from the server, most notably converting to camelCase.
const normalizeData = (job: IApiJob): IJob => ({
  locations: job.location.map((location) => location.name), // Locations contains name and slug
  deadline: job.deadline
    ? moment(job.deadline).format('Do MMMM YYYY')
    : 'Ikke spesifisert', // Format and give default value
  companyImage: job.company.image,
  companyName: job.company.name,
  companyDescription: job.company.short_description,
  companyId: job.company.id,
  title: job.title,
  ingress: job.ingress,
  description: job.description,
  type: job.employment.name,
  id: job.id,
  featured: job.featured,
});
