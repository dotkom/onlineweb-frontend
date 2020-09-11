import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { getAttendeeForEvent, userAttendEvent, userUnattendEvent } from 'events/api/attendee';
import { IAttendee } from 'events/models/Attendee';
import { IAuthUser } from 'authentication/models/User';
import { fetchAttendanceEventById } from './attendanceEvents';

const attendeesAdapter = createEntityAdapter<IAttendee>({
  sortComparer: (attendeeA, attendeeB) => {
    return attendeeA.timestamp.localeCompare(attendeeB.timestamp);
  },
});

export const attendeeSelectors = attendeesAdapter.getSelectors<State>((state) => state.attendees);

export const fetchAttendeeByEventId = createAsyncThunk('attendees/fetchByEventId', async (eventId: number) => {
  const attendee = await getAttendeeForEvent(eventId);
  return attendee;
});

export const setAttendeeByEventId = createAsyncThunk(
  'attendees/setByEventId',
  async (props: { eventId: number; captcha: string; user?: IAuthUser }, { dispatch }) => {
    const { eventId, captcha, user } = props;
    const ret = await userAttendEvent(eventId, captcha, undefined, user);
    if (ret) {
      dispatch(fetchAttendanceEventById(eventId));
    }
  }
);

export const removeAttendeeByEventId = createAsyncThunk(
  'attendees/removeByEventId',
  async (eventId: number, { dispatch }) => {
    await userUnattendEvent(eventId);
    dispatch(fetchAttendanceEventById(eventId));
  }
);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IAttendee>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const attendeesSlice = createSlice({
  name: 'attendees',
  initialState: attendeesAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAttendeeByEventId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAttendeeByEventId.fulfilled, (state, action) => {
      state.loading = 'idle';
      attendeesAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchAttendeeByEventId.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const attendeesReducer = attendeesSlice.reducer;
