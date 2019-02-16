import React, { Component, createContext } from 'react';

import { FilterJobs, getCareerOpportunities } from 'career/api';
import { ICareerOpportunity, IEmployment, ILocation, ISelectable, TagTypes } from 'career/models/Career';
import { prefetch } from 'common/utils/prefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';

import { IApiCompany } from 'core/models/Company';

type Filters = 'locations' | 'companies' | 'jobTypes';

/**
 * State of the provider class, including all the methods which will
 * be passed as the providers value, and thereby accessible from the Context.Consumer.
 */
export interface ICareerContextState {
  jobs: ICareerOpportunity[];
  locations: Array<ISelectable<ILocation>>;
  companies: Array<ISelectable<IApiCompany>>;
  jobTypes: Array<ISelectable<IEmployment>>;
  filterText: string;
  toggleLocation: (name: string) => void;
  toggleCompany: (name: string) => void;
  toggleJobType: (name: string) => void;
  handleReset: () => void;
  handleFilterChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * The Initial state of the context also contains methods which are designed to be overwritten.
 * They exist in case of a configuration error where they are not overwritten.
 */
const INITIAL_STATE: ICareerContextState = {
  jobs: [],
  locations: [],
  companies: [],
  jobTypes: [],
  filterText: '',
  toggleLocation: (_: string) => {
    throw new Error('A location was toggled before provider was initialized');
  },
  toggleCompany: (_: string) => {
    throw new Error('A company was toggled before provider was initialized');
  },
  toggleJobType: (_: string) => {
    throw new Error('A jobType was toggled before provider was initialized');
  },
  handleReset: () => {
    throw new Error('A Reset was triggerede before the provider was initialized');
  },
  handleFilterChange: (_: React.FormEvent<HTMLInputElement>) => {
    throw new Error('A filter change was triggerede before the provider was initialized');
  },
};

export const CareerContext = createContext(INITIAL_STATE);

export interface IProps {
  prefetch?: FilterJobs;
}

@prefetch(PrefetchKey.CAREER)
class CareerOpportunities extends Component<IProps, ICareerContextState> {
  public static async getServerState(_: IProps): Promise<FilterJobs> {
    const filterJobs = await getCareerOpportunities();
    return filterJobs;
  }

  constructor(props: IProps) {
    super(props);
    this.state = { ...INITIAL_STATE };

    if (props.prefetch && props.prefetch.length) {
      const [jobs, companies, jobTypes, locations] = props.prefetch;
      this.state = { ...this.state, jobs, companies, jobTypes, locations };
    }
  }

  public async componentDidMount() {
    const [jobs, companies, jobTypes, locations] = await getCareerOpportunities();
    this.setState({ ...this.state, jobs, companies, jobTypes, locations });
  }

  public toggleLocation = (name: string) => this.toggleTag('locations', name);
  public toggleCompany = (name: string) => this.toggleTag('companies', name);
  public toggleJobType = (name: string) => this.toggleTag('jobTypes', name);

  public handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({
        filterText: event.currentTarget.value,
      });
    }
  };

  /** Reset will be done by fetching initial state from API again */
  public handleReset = () => {
    this.componentDidMount();
    this.setState({ filterText: '' });
  };

  public render() {
    /**
     * Get all methods, filtered jobs, and the rest of the state.
     * Combine them to a single value of the same type as context state, and use it as the value of the provider.
     */
    const jobs = this.filterJobs();
    const { handleFilterChange, handleReset, toggleCompany, toggleJobType, toggleLocation } = this;
    const value: ICareerContextState = {
      ...this.state,
      handleFilterChange,
      handleReset,
      toggleCompany,
      toggleJobType,
      toggleLocation,
      jobs,
    };
    return <CareerContext.Provider value={value}>{this.props.children}</CareerContext.Provider>;
  }

  private toggleTag(tagType: Filters, name: string) {
    const tags: Array<ISelectable<TagTypes>> = this.state[tagType];
    const [old] = tags.filter((tag) => tag.value.name === name);
    const index = tags.indexOf(old);
    tags[index].selected = !tags[index].selected;
    this.setState({ ...this.state, [tagType]: tags });
  }

  /**
   * @summary Takes the full list of jobs from state and filters them based on the current filter in state.
   * @description Uses the state to filter the job list based on selected tags, and a filterable text field.
   * @returns {ICareerOpportunity[]} A list of filtered jobs.
   */
  private filterJobs(): ICareerOpportunity[] {
    const { jobs, locations, companies, jobTypes, filterText } = this.state;
    let filteredJobs: ICareerOpportunity[] = jobs;

    /**
     * Filter on a set of text-fields for each career opportunity.
     * Show the job if any of the field contain any part of the filterText
     */
    if (filterText !== '') {
      filteredJobs = filteredJobs.filter((job) => {
        const filterables = [job.title, job.ingress, job.description, job.company.name];
        return filterables.some((text) => text.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()));
      });
    }

    /** Filter on selectable tags. Filter on a category if any of the tags in the category is selected. */
    if (companies.some((company) => company.selected)) {
      const filterCompanies = companies.filter((company) => company.selected).map((selectable) => selectable.value);
      filteredJobs = filteredJobs.filter((job) => !!filterCompanies.find((company) => company.id === job.company.id));
    }
    if (jobTypes.some((employment) => employment.selected)) {
      const filterJobTypes = jobTypes.filter((employment) => employment.selected).map((selectable) => selectable.value);
      filteredJobs = filteredJobs.filter(
        (job) => !!filterJobTypes.find((employment) => employment.id === job.employment.id)
      );
    }
    if (locations.some((location) => location.selected)) {
      const filterLocations = locations.filter((location) => location.selected).map((selectable) => selectable.value);
      filteredJobs = filteredJobs.filter((job) =>
        job.location.some((loc) => !!filterLocations.find((location) => location.name === loc.name))
      );
    }
    return filteredJobs;
  }
}

export default CareerOpportunities;
