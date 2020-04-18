import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';
import { State } from 'core/redux/Store';
import { getEvent, getEvents } from 'events/api/events';
import { IEvent } from 'events/models/Event';
import { DateTime } from 'luxon';

const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (eventA, eventB) => {
    return Number(DateTime.fromISO(eventA.event_start) > DateTime.fromISO(eventB.event_start));
  },
});

export const eventSelectors = eventsAdapter.getSelectors<State>((state) => state.events);

export const fetchEventsList = createAsyncThunk('events/fetchList', async () => {
  const events = await getEvents();
  return events;
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId: number) => {
  const events = await getEvent(eventId);
  return events;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IEvent>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventsList.pending, (state) => {
      state.loading = 'pending';
    }),
      builder.addCase(fetchEventsList.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchEventsList.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      }),
      builder.addCase(fetchEventById.pending, (state) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addOne(state, action.payload);
      }),
      builder.addCase(fetchEventById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
