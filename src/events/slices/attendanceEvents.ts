import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { getAttendanceEvent } from '../api/events';
import { IAttendanceEvent } from '../models/Event';
import { getAttendanceEventLSKey, ObjectInLocalStorage } from 'events/components/DetailView';

const attendanceEventsAdapter = createEntityAdapter<IAttendanceEvent>({
  sortComparer: (attendanceEventA, attendanceEventB) => {
    return Date.parse(attendanceEventA.registration_start) - Date.parse(attendanceEventB.registration_start);
  },
});

export const attendanceEventSelectors = attendanceEventsAdapter.getSelectors<State>((state) => state.attendanceEvents);

export const fetchAttendanceEventById = createAsyncThunk('attendanceEvents/fetchById', async (eventId: number) => {
  const event = await getAttendanceEvent(eventId);
  // write to local storage
  if (event) {
    const key = getAttendanceEventLSKey(event.id);

    const toStore: ObjectInLocalStorage<IAttendanceEvent> = {
      data: event,
      // valid for 1 hour
      validTo: Date.now() + 60 * 60 * 1000,
    };

    localStorage.setItem(key, JSON.stringify(toStore));
  }
  return event;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IAttendanceEvent>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const attendanceEventsSlice = createSlice({
  name: 'events',
  initialState: attendanceEventsAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    setAttendanceEventFromLocalStorage(state, action) {
      attendanceEventsAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttendanceEventById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAttendanceEventById.fulfilled, (state, action) => {
      state.loading = 'idle';
      attendanceEventsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(fetchAttendanceEventById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const attendanceEventsReducer = attendanceEventsSlice.reducer;

export const { setAttendanceEventFromLocalStorage } = attendanceEventsSlice.actions;
