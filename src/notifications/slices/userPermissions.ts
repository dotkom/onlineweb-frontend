import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import {
  listNotificationUserPermissions,
  retrieveNotificationUserPermission,
  updateNotificationUserPermission,
} from 'notifications/api/userPermissions';
import { IUserPermission, IUpdateUserPermission } from 'notifications/models/UserPermission';

const userPermissionsAdapter = createEntityAdapter<IUserPermission>({
  sortComparer: (userPermissionA, userPermissionB) => {
    return userPermissionA.id - userPermissionB.id;
  },
});

export const userPermissionSelectors = userPermissionsAdapter.getSelectors<State>(
  (state) => state.notificationUserPermissions
);

export const fetchUserPermissionById = createAsyncThunk(
  'notificationUserPermissions/fetchById',
  async (userPermissionId: number) => {
    const response = await retrieveNotificationUserPermission(userPermissionId);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

export const fetchUserPermissions = createAsyncThunk('notificationUserPermissions/fetchList', async () => {
  const response = await listNotificationUserPermissions();
  if (response.status === 'success') {
    return response.data.results;
  } else {
    throw response.errors;
  }
});

export const fetchUpdateUserPermission = createAsyncThunk(
  'notificationUserPermissions/update',
  async ({
    userPermissionId,
    updateData,
  }: {
    userPermissionId: number;
    updateData: Partial<IUpdateUserPermission>;
  }) => {
    const response = await updateNotificationUserPermission(userPermissionId, updateData);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IUserPermission>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

const userPermissionsSlice = createSlice({
  name: 'notificationUserPermissions',
  initialState: userPermissionsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPermissionById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUserPermissionById.fulfilled, (state, action) => {
      state.loading = 'idle';
      userPermissionsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchUserPermissionById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchUserPermissions.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUserPermissions.fulfilled, (state, action) => {
      state.loading = 'idle';
      userPermissionsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchUserPermissions.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchUpdateUserPermission.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUpdateUserPermission.fulfilled, (state, action) => {
      state.loading = 'idle';
      const userPermission = action.payload;
      userPermissionsAdapter.updateOne(state, { id: userPermission.id, changes: userPermission });
    });
    builder.addCase(fetchUpdateUserPermission.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const notificationUserPermissionsReducer = userPermissionsSlice.reducer;
