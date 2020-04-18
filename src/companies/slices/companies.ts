import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICompany } from 'core/models/Company';
import { State } from 'core/redux/Store';

const companiesAdapter = createEntityAdapter<ICompany>({
  selectId: (company) => company.id,
  sortComparer: (companyA, companyB) => {
    return companyA.name.localeCompare(companyB.name);
  },
});

export const companySelectors = companiesAdapter.getSelectors<State>((state) => state.companies);

interface IState {
  entities: Record<string, ICompany>;
}

const INITIAL_STATE: IState = {
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
});

export const { addCompany, addCompanies } = companiesSlice.actions;

export const companiesReducer = companiesSlice.reducer;
