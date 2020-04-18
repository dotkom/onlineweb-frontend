import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from 'career/models/Career';
import { State } from 'core/redux/Store';

const careerLocationsAdapter = createEntityAdapter<ILocation>({
  selectId: (location) => location.slug,
  sortComparer: (locationA, locationB) => {
    return locationA.slug.localeCompare(locationB.slug);
  },
});

export const careerLocationSelectors = careerLocationsAdapter.getSelectors<State>((state) => state.careerLocations);

interface IState {
  entities: Record<string, ILocation>;
}

const INITIAL_STATE: IState = {
  entities: {},
};

export const careerLocationsSlice = createSlice({
  name: 'careerLocations',
  initialState: careerLocationsAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    addCareerLocation(state, action: PayloadAction<ILocation>) {
      const location = action.payload;
      careerLocationsAdapter.addOne(state, location);
    },
    addCareerLocations(state, action: PayloadAction<ILocation[]>) {
      const locations = action.payload;
      careerLocationsAdapter.addMany(state, locations);
    },
  },
});

export const { addCareerLocation, addCareerLocations } = careerLocationsSlice.actions;

export const careerLocationsReducer = careerLocationsSlice.reducer;
