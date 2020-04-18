import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEmployment } from 'career/models/Career';
import { State } from 'core/redux/Store';

const jobTypesAdapter = createEntityAdapter<IEmployment>({
  selectId: (jobType) => jobType.id,
  sortComparer: (jobTypeA, jobTypeB) => {
    return jobTypeA.name.localeCompare(jobTypeB.name);
  },
});

export const jobTypeSelectors = jobTypesAdapter.getSelectors<State>((state) => state.jobTypes);

interface IState {
  entities: Record<string, IEmployment>;
}

const INITIAL_STATE: IState = {
  entities: {},
};

export const jobTypesSlice = createSlice({
  name: 'jobTypes',
  initialState: jobTypesAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    addJobType(state, action: PayloadAction<IEmployment>) {
      const jobType = action.payload;
      jobTypesAdapter.addOne(state, jobType);
    },
    addJobTypes(state, action: PayloadAction<IEmployment[]>) {
      const jobTypes = action.payload;
      jobTypesAdapter.addMany(state, jobTypes);
    },
  },
});

export const { addJobType, addJobTypes } = jobTypesSlice.actions;

export const jobTypesReducer = jobTypesSlice.reducer;
