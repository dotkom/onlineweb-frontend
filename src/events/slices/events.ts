import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError, unwrapResult } from '@reduxjs/toolkit';
import { State } from 'core/redux/Store';
import { getEvent, IEventAPIParameters, listEvents } from 'events/api/events';
import { EventTypeEnum, IEvent } from 'events/models/Event';
import { DateTime, Interval } from 'luxon';

const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (eventA, eventB) => {
    return Number(DateTime.fromISO(eventA.start_date) > DateTime.fromISO(eventB.start_date));
  },
});

export const eventSelectors = eventsAdapter.getSelectors<State>((state) => state.events);

export const fetchEvents = createAsyncThunk('events/fetchMultiple', async (options?: IEventAPIParameters) => {
  const response = await listEvents(options);
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId: number) => {
  const event = await getEvent(eventId);
  return event;
});

export const fetchEventList = createAsyncThunk('events/fetchList', async (_, { dispatch }) => {
  const response = await dispatch(
    fetchEvents({
      event_end__gte: DateTime.local().toISODate(),
      page_size: 10,
    })
  );
  return unwrapResult(response);
});

export const fetchImageEvents = createAsyncThunk('events/fetchImageEvents', async (_, { dispatch }) => {
  const getTypeEvents = async (types: EventTypeEnum[]) => {
    return await dispatch(
      fetchEvents({
        event_end__gte: DateTime.local().toISODate(),
        event_type: types,
        page_size: 4,
      })
    );
  };
  // Separate the three column fetches to be able to present some columns even if 1 type of events fails.
  const left = getTypeEvents([EventTypeEnum.BEDPRES]);
  const middle = getTypeEvents([EventTypeEnum.KURS]);
  const right = getTypeEvents([
    EventTypeEnum.SOSIALT,
    EventTypeEnum.UTFLUKT,
    EventTypeEnum.EKSKURSJON,
    EventTypeEnum.ANNET,
  ]);
  const responses = await Promise.all([left, right, middle]);
  const result = responses.map((payloadCallback) => unwrapResult(payloadCallback));
  return result;
});

export const fetchEventsInInterval = createAsyncThunk(
  'events/fetchInInterval',
  async (interval: Interval, { dispatch }) => {
    /** Set the query parameters of the fetch to the range, set page size large enough to get all */
    const events = await dispatch(
      fetchEvents({
        event_start__gte: interval.start.toISODate(),
        event_start__lte: interval.end.plus({ days: 1 }).toISODate(),
        page_size: 60,
      })
    );
    return events;
  }
);

interface EventFilters {
  query: string;
  eventTypes: EventTypeEnum[];
  showOnlyAttendanceEvents: boolean;
}

export const filterEvents = createAsyncThunk('events/fitler', async (filters: EventFilters, { dispatch, getState }) => {
  const state = getState() as State;
  const { pageSize, page } = state.events.search;
  const response = await dispatch(
    fetchEvents({
      query: filters.query,
      attendance_event__isnull: filters.showOnlyAttendanceEvents ? 'False' : undefined,
      event_type: filters.eventTypes,
      page_size: pageSize,
      page,
    })
  );
  return unwrapResult(response);
});

interface ISearch {
  ids: number[];
  page: number;
  count: number;
  pageSize: number;
  requestId: string | null;
  loading: 'idle' | 'pending';
}

const INITIAL_SEARCH_STATE: ISearch = {
  ids: [],
  page: 1,
  count: 0,
  pageSize: 30,
  requestId: null,
  loading: 'idle',
};

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IEvent>;
  search: ISearch;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
  search: INITIAL_SEARCH_STATE,
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
        const events = action.payload.results;
        eventsAdapter.addMany(state, events);
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
      });
    builder.addCase(filterEvents.pending, (state, action) => {
      state.search.loading = 'pending';
      state.search.requestId = action.meta.requestId;
    });
    builder.addCase(filterEvents.fulfilled, (state, action) => {
      // We only care about the result of the latest search request, any others will only hinder performance.
      if (state.search.requestId === action.meta.requestId) {
        const { results, count } = action.payload;
        state.search.loading = 'idle';
        state.search.count = count;
        state.search.ids = results.map((event) => event.id);
      }
    });
    builder.addCase(filterEvents.rejected, (state, action) => {
      state.search.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const eventsReducer = eventsSlice.reducer;
