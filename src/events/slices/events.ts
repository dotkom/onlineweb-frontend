import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';
import { State } from 'core/redux/Store';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { getImageEvents } from 'events/api/imageEvents';
import { getListEvents } from 'events/api/listEvents';
import { IEvent } from 'events/models/Event';
import { DateTime } from 'luxon';

const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (eventA, eventB) => {
    return Number(DateTime.fromISO(eventA.event_start) > DateTime.fromISO(eventB.event_start));
  },
});

export const eventSelectors = eventsAdapter.getSelectors<State>((state) => state.events);

export const fetchEvents = createAsyncThunk('events/fetchAll', async (options?: IEventAPIParameters) => {
  const events = await getEvents(options);
  return events;
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId: number) => {
  const events = await getEvent(eventId);
  return events;
});

export const fetchEventList = createAsyncThunk('events/fetchList', async () => {
  const events = await getListEvents();
  return events;
});

export const fetchImageEvents = createAsyncThunk('events/fetchImageEvents', async () => {
  const events = await getImageEvents();
  return events;
});

export const fetchEventsByMonth = createAsyncThunk('events/fetchByMonth', async (month: DateTime) => {
  const events = await getCalendarEvents(month);
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
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = 'pending';
    }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
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
      }),
      builder.addCase(fetchEventList.pending, (state) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchEventList.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchEventList.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      }),
      builder.addCase(fetchImageEvents.pending, (state) => {
        state.loading = 'idle';
      }),
      builder.addCase(fetchImageEvents.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchImageEvents.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      }),
      builder.addCase(fetchEventsByMonth.pending, (state) => {
        state.loading = 'idle';
      }),
      builder.addCase(fetchEventsByMonth.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchEventsByMonth.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
