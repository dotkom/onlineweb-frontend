import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { ISubscription, IDeviceSubscription } from 'notifications/models/Subscription';
import {
  listNotificationSubscriptions,
  retrieveNotificationSubscription,
  createNotificationSubscription,
  destroyNotificationSubscription,
} from 'notifications/api/subscriptions';
import {
  registerPushManager,
  removeNotificationSubscription,
  getNotificationSubscription,
} from 'common/utils/pushManager';
import { resolveNotificationPermission, getNotificationPermission } from 'common/utils/notification';

const subscriptionsAdapter = createEntityAdapter<ISubscription>({
  sortComparer: (subscriptionA, subscriptionB) => {
    return subscriptionA.id - subscriptionB.id;
  },
});

export const subscriptionSelectors = subscriptionsAdapter.getSelectors<State>(
  (state) => state.notificationSubscriptions
);

export const fetchSubscriptionById = createAsyncThunk(
  'notificationSubscriptions/fetchById',
  async (subscriptionId: number) => {
    const response = await retrieveNotificationSubscription(subscriptionId);
    if (response.status === 'success') {
      return response.data;
    } else {
      throw response.errors;
    }
  }
);

export const fetchSubscriptions = createAsyncThunk('notificationSubscriptions/fetchList', async () => {
  const response = await listNotificationSubscriptions();
  if (response.status === 'success') {
    return response.data.results;
  } else {
    throw response.errors;
  }
});

const transformDeviceSubscription = (subscription: PushSubscription): IDeviceSubscription => {
  const subscriptionJson = subscription.toJSON();
  const deviceSubscription = {
    endpoint: subscriptionJson.endpoint,
    auth: subscriptionJson.keys?.auth,
    p256dh: subscriptionJson.keys?.p256dh,
  } as IDeviceSubscription;
  return deviceSubscription;
};

export const registerDeviceForPushNotifications = createAsyncThunk(
  'notificationSubscriptions/registerDevice',
  async (_, { dispatch }) => {
    const { subscription, message } = await registerPushManager();
    if (subscription) {
      const deviceSubscription = transformDeviceSubscription(subscription);
      dispatch(subscriptionUpdated({ subscription: deviceSubscription, message }));
      const response = await createNotificationSubscription(deviceSubscription);
      if (response.status === 'success') {
        return response.data;
      } else {
        throw response.errors;
      }
    } else {
      dispatch(subscriptionUpdated({ subscription: null, message }));
      throw message;
    }
  }
);

export const unregisterDeviceFromPushNotifications = createAsyncThunk(
  'notificationSubscriptions/unregisterDevice',
  async (_, { getState }) => {
    const state = getState() as State;
    const { deviceSubscription } = state.notificationSubscriptions;
    if (!deviceSubscription) {
      return;
    }
    const subscription = subscriptionSelectors
      .selectAll(state)
      .find((sub) => sub.endpoint === deviceSubscription.endpoint);
    if (!subscription) {
      return;
    }
    const response = await destroyNotificationSubscription(subscription.id);
    if (response.status !== 'success') {
      throw response.errors;
    }
    const removed = await removeNotificationSubscription();
    if (removed) {
      subscriptionUpdated({ subscription: null, message: null });
    }
    return subscription.id;
  }
);

export const toggleDevicePermission = createAsyncThunk('notificationSubscriptions/toggleDevicePermission', async () => {
  const allowNotifications = await getNotificationPermission();
  return allowNotifications;
});

export const resolveCurrentDeviceSubscription = createAsyncThunk(
  'notificationSubscriptions/resolveCurrent',
  async () => {
    const subscription = await getNotificationSubscription();
    if (subscription) {
      const deviceSubscription = transformDeviceSubscription(subscription);
      return deviceSubscription;
    } else {
      throw null;
    }
  }
);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ISubscription>;
  deviceSubscription: IDeviceSubscription | null;
  allowNotifications: boolean;
  message: string | null;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  deviceSubscription: null,
  allowNotifications: resolveNotificationPermission(),
  message: null,
};

const subscriptionsSlice = createSlice({
  name: 'notificationSubscriptions',
  initialState: subscriptionsAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    subscriptionUpdated(
      state,
      action: PayloadAction<{ subscription: IDeviceSubscription | null; message: string | null }>
    ) {
      const { subscription, message } = action.payload;
      state.message = message;
      state.deviceSubscription = subscription;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubscriptionById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchSubscriptionById.fulfilled, (state, action) => {
      state.loading = 'idle';
      subscriptionsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchSubscriptionById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchSubscriptions.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchSubscriptions.fulfilled, (state, action) => {
      state.loading = 'idle';
      subscriptionsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchSubscriptions.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(registerDeviceForPushNotifications.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(registerDeviceForPushNotifications.fulfilled, (state, action) => {
      state.loading = 'idle';
      subscriptionsAdapter.addOne(state, action.payload);
    });
    builder.addCase(registerDeviceForPushNotifications.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(unregisterDeviceFromPushNotifications.fulfilled, (state, action) => {
      const subscriptionId = action.payload;
      if (subscriptionId) {
        subscriptionsAdapter.removeOne(state, subscriptionId);
      }
    });
    builder.addCase(unregisterDeviceFromPushNotifications.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(toggleDevicePermission.fulfilled, (state, action) => {
      state.allowNotifications = action.payload;
    });
    builder.addCase(resolveCurrentDeviceSubscription.fulfilled, (state, action) => {
      state.deviceSubscription = action.payload;
    });
  },
});

const { subscriptionUpdated } = subscriptionsSlice.actions;

export const notificationSubscriptionsReducer = subscriptionsSlice.reducer;
