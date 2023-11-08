import { ICommitteeUpdateAPIParameters, getCommitteeUpdates, listCommitteeUpdates } from 'committeeupdates/api';
import { SerializedError, createAsyncThunk, createEntityAdapter, createSlice, unwrapResult } from '@reduxjs/toolkit';

import { DateTime } from 'luxon';
import { ICommitteeUpdate } from 'committeeupdates/models/CommitteeUpdate';
import { State } from 'core/redux/Store';

const committeeUpdateAdapter = createEntityAdapter<ICommitteeUpdate>({
  sortComparer: (statusA, statusB) => {
    return Number(DateTime.fromISO(statusA.created_at) > DateTime.fromISO(statusB.created_at));
  },
});

export const committeeUpdateSelectors = committeeUpdateAdapter.getSelectors<State>((state) => state.committeeUpdates);

export const fetchCommitteeUpdates = createAsyncThunk(
  'committeeUpdates/fetchMultiple',
  async (options?: ICommitteeUpdateAPIParameters) => {
    const response = await listCommitteeUpdates(options);
    // sleep for 0.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

export const fetchCommitteeUpdatesList = createAsyncThunk(
  'committeeUpdates/fetchList',
  async (_, { dispatch, getState }) => {
    const state = getState() as State;
    const { pageSize, page } = state.committeeUpdates.search;
    const response = await dispatch(
      fetchCommitteeUpdates({
        page_size: pageSize,
        page: page,
      })
    );
    return {
      ...unwrapResult(response),
      page,
    };
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

const INITIAL_SEARCH_STATE: ISearch = {
  ids: [],
  page: 1,
  count: 0,
  pageSize: 7,
  requestId: null,
  loading: 'idle',
};

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ICommitteeUpdate>;
  search: ISearch;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  search: INITIAL_SEARCH_STATE,
};

export const committeeUpdatesSlice = createSlice({
  name: 'committeeUpdates',
  initialState: committeeUpdateAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    nextCommitteeUpdatePage(state) {
      if (state.search.page * state.search.pageSize < state.search.count) {
        state.search.page += 1;
      }
      // state.search.page += 1;
    },
    resetCommitteeUpdatePage(state) {
      state.search.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommitteeUpdates.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCommitteeUpdates.fulfilled, (state, action) => {
      state.loading = 'idle';
      const committeeUpdates = action.payload.results;
      state.search.count = action.payload.count;
      committeeUpdateAdapter.upsertMany(state, committeeUpdates);
    });
    builder.addCase(fetchCommitteeUpdates.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchCommitteeUpdatesList.pending, (state, action) => {
      state.search.loading = 'pending';
      state.search.requestId = action.meta.requestId;
    });
    builder.addCase(fetchCommitteeUpdatesList.fulfilled, (state, action) => {
      // if (state.search.requestId === action.meta.requestId) {
      state.search.loading = 'idle';
      state.search.ids = action.payload.results.map((committeeUpdate) => committeeUpdate.id);
      state.search.count = action.payload.count;
      committeeUpdateAdapter.upsertMany(state, action.payload.results);
      // }
    });
    builder.addCase(fetchCommitteeUpdatesList.rejected, (state, action) => {
      state.search.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const { nextCommitteeUpdatePage, resetCommitteeUpdatePage } = committeeUpdatesSlice.actions;

export const committeeUpdatesReducer = committeeUpdatesSlice.reducer;
