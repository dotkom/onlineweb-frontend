import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { IPublicAttendee } from 'events/models/Attendee';
import { getPublicAttendeesForEvent } from 'events/api/publicAttendee';

const publicAttendeesAdapter = createEntityAdapter<IPublicAttendee>({
  sortComparer: (attendeeA, attendeeB) => {
    return attendeeA.id - attendeeB.id;
  },
});

export const publicAttendeeSelectors = publicAttendeesAdapter.getSelectors<State>((state) => state.publicAttendees);

export const fetchPublicAttendeesByEventId = createAsyncThunk(
  'publicAttendees/fetchByEventId',
  async (eventId: number) => {
    const attendees = await getPublicAttendeesForEvent(eventId);
    return attendees;
  }
);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IPublicAttendee>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const publicAttendeesSlice = createSlice({
  name: 'publicAttendees',
  initialState: publicAttendeesAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPublicAttendeesByEventId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPublicAttendeesByEventId.fulfilled, (state, action) => {
      state.loading = 'idle';
      publicAttendeesAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchPublicAttendeesByEventId.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const publicAttendeesReducer = publicAttendeesSlice.reducer;
