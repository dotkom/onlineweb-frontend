import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { getAttendanceEvent } from '../api/events';
import { IAttendanceEvent } from '../models/Event';

const attendanceEventsAdapter = createEntityAdapter<IAttendanceEvent>({
  sortComparer: (attendanceEventA, attendanceEventB) => {
    return Date.parse(attendanceEventA.registration_start) - Date.parse(attendanceEventB.registration_start);
  },
});

export const attendanceEventSelectors = attendanceEventsAdapter.getSelectors<State>((state) => state.attendanceEvents);

export const fetchAttendanceEventById = createAsyncThunk('attendanceEvents/fetchById', async (eventId: number) => {
  const events = await getAttendanceEvent(eventId);
  return events;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAttendanceEventById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAttendanceEventById.fulfilled, (state, action) => {
      state.loading = 'idle';
      attendanceEventsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchAttendanceEventById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const attendanceEventsReducer = attendanceEventsSlice.reducer;
