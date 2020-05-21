import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { INotification } from 'notifications/models/Notification';
import { retrieveNotificationMessage, listNotificationMessages } from 'notifications/api/notifications';

const notificationsAdapter = createEntityAdapter<INotification>({
  sortComparer: (notificationA, notificationB) => {
    return notificationA.created_date.localeCompare(notificationB.created_date);
  },
});

export const notificationSelectors = notificationsAdapter.getSelectors<State>((state) => state.notificationMessages);

export const fetchNotificationMessageById = createAsyncThunk(
  'notificationMessages/fetchById',
  async (notificationId: number) => {
    const response = await retrieveNotificationMessage(notificationId);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

export const fetchNotificationMessages = createAsyncThunk('notificationMessages/fetchList', async () => {
  const response = await listNotificationMessages();
  if (response.status === 'success') {
    return response.data.results;
  } else {
    throw response.errors;
  }
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, INotification>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

const notificationMessagesSlice = createSlice({
  name: 'notificationMessages',
  initialState: notificationsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationMessageById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchNotificationMessageById.fulfilled, (state, action) => {
      state.loading = 'idle';
      notificationsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchNotificationMessageById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchNotificationMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchNotificationMessages.fulfilled, (state, action) => {
      state.loading = 'idle';
      notificationsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchNotificationMessages.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const notificationMessagesReducer = notificationMessagesSlice.reducer;
