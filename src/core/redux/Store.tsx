import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from 'articles/slices/articles';
import { authenticationReducer } from 'authentication/slices/authentication';
import { careerLocationsReducer } from 'career/slices/careerLocations';
import { careerOpportunitiesReducer } from 'career/slices/careerOpportunities';
import { jobTypesReducer } from 'career/slices/jobTypes';
import { companiesReducer } from 'companies/slices/companies';
import { attendanceEventsReducer } from 'events/slices/attendanceEvents';
import { attendeesReducer } from 'events/slices/attendees';
import { eventsReducer } from 'events/slices/events';
import { ruleBundlesReducer } from 'events/slices/ruleBundles';
import { onlineGroupsReducer } from 'groups/slices/onlineGroups';
import { transactionsReducer } from 'payments/reducers/transactions';
import { paymentsReducer } from 'payments/slices/payments';
import { shopReducer } from 'shop/reducers';
import { publicAttendeesReducer } from 'events/slices/publicAttendees';
import { notificationMessagesReducer } from 'notifications/slices/notifications';
import { notificationPermissionsReducer } from 'notifications/slices/permissions';
import { notificationSubscriptionsReducer } from 'notifications/slices/subscriptions';
import { notificationUserPermissionsReducer } from 'notifications/slices/userPermissions';

export const initStore = (initialState: {} = {}) => {
  return configureStore({
    preloadedState: initialState,
    /* eslint sort-keys: "error" */
    reducer: {
      articles: articlesReducer,
      attendanceEvents: attendanceEventsReducer,
      attendees: attendeesReducer,
      authentication: authenticationReducer,
      careerLocations: careerLocationsReducer,
      careerOpportunities: careerOpportunitiesReducer,
      companies: companiesReducer,
      events: eventsReducer,
      jobTypes: jobTypesReducer,
      notificationMessages: notificationMessagesReducer,
      notificationPermissions: notificationPermissionsReducer,
      notificationSubscriptions: notificationSubscriptionsReducer,
      notificationUserPermissions: notificationUserPermissionsReducer,
      onlineGroups: onlineGroupsReducer,
      payments: paymentsReducer,
      publicAttendees: publicAttendeesReducer,
      ruleBundles: ruleBundlesReducer,
      shop: shopReducer,
      transactions: transactionsReducer,
    },
    /* eslint sort-keys: "off" */
  });
};

export const store = initStore();

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Store = typeof store;
