import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { getOnlineGroup } from 'groups/api';
import { IOnlineGroup } from 'groups/models/onlinegroup';

const onlineGroupsAdapter = createEntityAdapter<IOnlineGroup>({
  sortComparer: (groupA, groupB) => {
    return groupA.name_long.localeCompare(groupB.name_long);
  },
});

export const onlineGroupSelectors = onlineGroupsAdapter.getSelectors<State>((state) => state.onlineGroups);

export const fetchOnlineGroupById = createAsyncThunk('onlineGroups/fetchById', async (groupId: number) => {
  const onlineGroup = await getOnlineGroup(groupId);
  return onlineGroup;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IOnlineGroup>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const onlineGroupsSlice = createSlice({
  name: 'onlineGroups',
  initialState: onlineGroupsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnlineGroupById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchOnlineGroupById.fulfilled, (state, action) => {
      state.loading = 'idle';
      onlineGroupsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchOnlineGroupById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const onlineGroupsReducer = onlineGroupsSlice.reducer;
