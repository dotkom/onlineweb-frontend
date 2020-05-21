import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { listNotificationPermissions, retrieveNotificationPermission } from 'notifications/api/permissions';
import { IPermission } from 'notifications/models/Permission';

const permissionsAdapter = createEntityAdapter<IPermission>({
  sortComparer: (permissionA, permissionB) => {
    return permissionA.permission_type.localeCompare(permissionB.permission_type);
  },
});

export const permissionSelectors = permissionsAdapter.getSelectors<State>((state) => state.notificationPermissions);

export const fetchPermissionById = createAsyncThunk(
  'notificationPermissions/fetchById',
  async (permissionId: number) => {
    const response = await retrieveNotificationPermission(permissionId);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

export const fetchPermissions = createAsyncThunk('notificationPermissions/fetchList', async () => {
  const response = await listNotificationPermissions();
  if (response.status === 'success') {
    return response.data.results;
  } else {
    throw response.errors;
  }
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IPermission>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

const permissionsSlice = createSlice({
  name: 'notificationPermissions',
  initialState: permissionsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPermissionById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPermissionById.fulfilled, (state, action) => {
      state.loading = 'idle';
      permissionsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchPermissionById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchPermissions.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.loading = 'idle';
      permissionsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchPermissions.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const notificationPermissionsReducer = permissionsSlice.reducer;
