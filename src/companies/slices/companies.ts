import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
  unwrapResult,
} from '@reduxjs/toolkit';

import { retrieveCompany, listCompanies } from 'companies/api';
import { ICompany } from 'companies/models/Company';
import { State } from 'core/redux/Store';

const companiesAdapter = createEntityAdapter<ICompany>({
  selectId: (company) => company.id,
  sortComparer: (companyA, companyB) => {
    return companyA.name.localeCompare(companyB.name);
  },
});

export const companySelectors = companiesAdapter.getSelectors<State>((state) => state.companies);

interface IFilters {
  query?: string;
  name?: string;
  page?: number;
  pageSize?: number;
}

export const fetchCompanyList = createAsyncThunk('companies/fetchList', async (filters: IFilters = {}) => {
  const response = await listCompanies({
    page_size: filters?.pageSize,
    page: filters?.page,
    query: filters?.query,
    name: filters?.name,
  });
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

export const filterCompanies = createAsyncThunk(
  'companies/fitler',
  async (filters: IFilters, { getState, dispatch }) => {
    const state = getState() as State;
    const { pageSize } = state.companies.search;
    const response = await dispatch(
      fetchCompanyList({
        pageSize: pageSize,
        page: filters?.page,
        query: filters?.query,
        name: filters?.name,
      })
    );
    return {
      ...unwrapResult(response),
      page: filters.page || 1,
    };
  }
);

export const fetchCompanyById = createAsyncThunk('companies/fetchById', async (companyId: number) => {
  const response = await retrieveCompany(companyId);
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

interface ISearch {
  ids: number[];
  page: number;
  count: number;
  pageSize: number;
  requestId: string | null;
  loading: 'idle' | 'pending';
}

const INITIAL_SEARCH_STATE: ISearch = {
  ids: [],
  page: 1,
  count: 0,
  pageSize: 12,
  requestId: null,
  loading: 'idle',
};

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ICompany>;
  search: ISearch;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  search: INITIAL_SEARCH_STATE,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: companiesAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    addCompany(state, action: PayloadAction<ICompany>) {
      const company = action.payload;
      companiesAdapter.addOne(state, company);
    },
    addCompanies(state, action: PayloadAction<ICompany[]>) {
      const companies = action.payload;
      companiesAdapter.addMany(state, companies);
    },
    nextCompanyPage(state) {
      state.search.page++;
    },
    resetCompanyPage(state) {
      state.search.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
      state.loading = 'idle';
      companiesAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchCompanyById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchCompanyList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCompanyList.fulfilled, (state, action) => {
      state.loading = 'idle';
      const companies = action.payload.results;
      companiesAdapter.addMany(state, companies);
    });
    builder.addCase(fetchCompanyList.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(filterCompanies.pending, (state, action) => {
      state.search.loading = 'pending';
      state.search.requestId = action.meta.requestId;
    });
    builder.addCase(filterCompanies.fulfilled, (state, action) => {
      // We only care about the result of the latest search request, any others will only hinder performance.
      if (state.search.requestId === action.meta.requestId) {
        const { results, count, page } = action.payload;
        state.search.loading = 'idle';
        state.search.count = count;
        const resultIds = results.map((company) => company.id);
        if (page === 1) {
          state.search.ids = resultIds;
        } else {
          state.search.ids = state.search.ids.concat(resultIds);
        }
      }
    });
    builder.addCase(filterCompanies.rejected, (state, action) => {
      state.search.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const { addCompany, addCompanies, nextCompanyPage, resetCompanyPage } = companiesSlice.actions;

export const companiesReducer = companiesSlice.reducer;
