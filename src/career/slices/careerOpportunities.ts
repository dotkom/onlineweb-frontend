import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { getCareerOpportunities, retrieveCareerOpportunity } from 'career/api';
import { ICareerOpportunity } from 'career/models/Career';
import { addCompanies } from 'companies/slices/companies';
import { State } from 'core/redux/Store';

import { addCareerLocations } from './careerLocations';
import { addJobTypes } from './jobTypes';

const careerOpportunitiesAdapter = createEntityAdapter<ICareerOpportunity>({
  sortComparer: (opportunityA, opportunityB) => {
    if (opportunityA.featured === opportunityB.featured) {
      return Date.parse(opportunityB.start) - Date.parse(opportunityA.start);
    } else if (opportunityA.featured) {
      return -1;
    } else {
      return 1;
    }
  },
});

export const careerOpportunitySelectors = careerOpportunitiesAdapter.getSelectors<State>(
  (state) => state.careerOpportunities
);

export const fetchAllCareerOpportunityContent = createAsyncThunk(
  'careerOpportunities/fetchAllContent',
  async (_, { dispatch }) => {
    const today = DateTime.local().toISODate();
    const filters = {
      page_size: 100,
      start__lte: today,
      end__gte: today,
    };
    const [opportunities, companies, jobTypes, locations] = await getCareerOpportunities(filters);
    dispatch(addCareerLocations(locations));
    dispatch(addCompanies(companies));
    dispatch(addJobTypes(jobTypes));
    return opportunities;
  }
);

export const fetchCareerOpportunityById = createAsyncThunk(
  'careerOpportunities/fetchById',
  async (opportunityId: number) => {
    const response = await retrieveCareerOpportunity(opportunityId);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

interface IFilters {
  locationIds: string[];
  companyIds: number[];
  jobTypeIds: number[];
  query: string;
}

export const filterCareerOpportunities = createAsyncThunk(
  'careerOpportunities/filter',
  async (params: IFilters, { dispatch, getState }) => {
    const state = getState() as State;
    const { pageSize, page } = state.careerOpportunities.search;
    const today = DateTime.local().toISODate();
    const filters = {
      location__in: params.locationIds,
      company__in: params.companyIds,
      employment__in: params.jobTypeIds,
      query: params.query,
      page_size: pageSize,
      page,
      start__lte: today,
      end__gte: today,
    };
    const [opportunities, companies, jobTypes, locations] = await getCareerOpportunities(filters);
    dispatch(addCareerLocations(locations));
    dispatch(addCompanies(companies));
    dispatch(addJobTypes(jobTypes));
    return opportunities;
  }
);

interface ISearch {
  ids: number[];
  page: number;
  count: number;
  pageSize: number;
  requestId: string | null;
  loading: 'idle' | 'pending';
}

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ICareerOpportunity>;
  filters: IFilters;
  search: ISearch;
}

const INITIAL_FILTERS_STATE: IFilters = {
  locationIds: [],
  companyIds: [],
  jobTypeIds: [],
  query: '',
};

const INITIAL_SEARCH_STATE: ISearch = {
  ids: [],
  page: 1,
  count: 0,
  pageSize: 100,
  requestId: null,
  loading: 'idle',
};

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  filters: INITIAL_FILTERS_STATE,
  search: INITIAL_SEARCH_STATE,
};

const toggle = <T>(iterable: T[], item: T) => {
  const index = iterable.indexOf(item);
  if (index >= 0) {
    iterable.splice(index, 1);
  } else {
    iterable.push(item);
  }
};

export const careerOpportunitiesSlice = createSlice({
  name: 'careerOpportunities',
  initialState: careerOpportunitiesAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    setCareerFilterQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload;
    },
    toggleCareerFilterLocation(state, action: PayloadAction<string>) {
      const locationId = action.payload;
      toggle(state.filters.locationIds, locationId);
    },
    toggleCareerFilterCompany(state, action: PayloadAction<number>) {
      const companyId = action.payload;
      toggle(state.filters.companyIds, companyId);
    },
    toggleCareerFilterJobType(state, action: PayloadAction<number>) {
      const jobTypeId = action.payload;
      toggle(state.filters.jobTypeIds, jobTypeId);
    },
    resetCareerFilters(state) {
      state.filters = INITIAL_FILTERS_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCareerOpportunityContent.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAllCareerOpportunityContent.fulfilled, (state, action) => {
      state.loading = 'idle';
      careerOpportunitiesAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchAllCareerOpportunityContent.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchCareerOpportunityById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCareerOpportunityById.fulfilled, (state, action) => {
      state.loading = 'idle';
      careerOpportunitiesAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchCareerOpportunityById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(filterCareerOpportunities.pending, (state, action) => {
      state.search.loading = 'pending';
      state.search.requestId = action.meta.requestId;
    });
    builder.addCase(filterCareerOpportunities.fulfilled, (state, action) => {
      // We only care about the result of the latest search request, any others will only hinder performance.
      if (state.search.requestId === action.meta.requestId) {
        state.loading = 'idle';
        const filteredOpportunities = action.payload;
        state.search.ids = filteredOpportunities.map((opportunity) => opportunity.id);
        careerOpportunitiesAdapter.addMany(state, filteredOpportunities);
      }
    });
    builder.addCase(filterCareerOpportunities.rejected, (state, action) => {
      state.search.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const {
  setCareerFilterQuery,
  toggleCareerFilterCompany,
  toggleCareerFilterJobType,
  toggleCareerFilterLocation,
  resetCareerFilters,
} = careerOpportunitiesSlice.actions;

export const careerOpportunitiesReducer = careerOpportunitiesSlice.reducer;
