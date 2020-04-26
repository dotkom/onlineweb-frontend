import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

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

export const fetchCompanyList = createAsyncThunk('companies/fetchList', async () => {
  const response = await listCompanies({
    page_size: 12,
  });
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

export const fetchCompanyById = createAsyncThunk('companies/fetchById', async (companyId: number) => {
  const response = await retrieveCompany(companyId);
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ICompany>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
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
  },
});

export const { addCompany, addCompanies } = companiesSlice.actions;

export const companiesReducer = companiesSlice.reducer;
