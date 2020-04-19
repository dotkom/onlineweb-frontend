import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from 'articles/slices/articles';
import { careerLocationsReducer } from 'career/slices/careerLocations';
import { careerOpportunitiesReducer } from 'career/slices/careerOpportunities';
import { jobTypesReducer } from 'career/slices/jobTypes';
import { companiesReducer } from 'companies/slices/companies';
import { eventsReducer } from 'events/slices/events';
import { paymentsReducer } from 'payments/reducers';
import { shopReducer } from 'shop/reducers';

export const initStore = (initialState: {} = {}) => {
  return configureStore({
    preloadedState: initialState,
    reducer: {
      articles: articlesReducer,
      careerLocations: careerLocationsReducer,
      careerOpportunities: careerOpportunitiesReducer,
      companies: companiesReducer,
      events: eventsReducer,
      jobTypes: jobTypesReducer,
      payments: paymentsReducer,
      shop: shopReducer,
    },
  });
};

export const store = initStore();

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Store = typeof store;
