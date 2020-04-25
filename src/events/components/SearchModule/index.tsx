import React, { FC, useState, useEffect } from 'react';

import { SearchInput } from 'common/components/Forms/SearchInput';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { EventTypeEnum } from 'events/models/Event';
import { filterEvents, AttendanceFilterType, ATTENDANCE_FILTERS, resetEventPage } from 'events/slices/events';

import style from './search.less';
import { SelectEventTypes } from './SelectEventTypes';

const SearchModule: FC = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectCurrentPage());
  const [query, setQuery] = useState('');
  const [eventTypes, setEventTypes] = useState<EventTypeEnum[]>([]);
  const [attendanceFilter, setAttendanceFilter] = useState<AttendanceFilterType>('SHOW_ALL');

  useEffect(() => {
    dispatch(filterEvents({ query, eventTypes, attendanceFilter, page }));
  }, [query, String(eventTypes), attendanceFilter, page]);

  useEffect(() => {
    dispatch(resetEventPage());
  }, [query, String(eventTypes), attendanceFilter]);

  return (
    <div className={style.container}>
      <SearchInput defaultValue={query} onChange={(event) => setQuery(event.target.value)} />
      <div className={style.grid}>
        <SelectEventTypes selected={eventTypes} onChange={setEventTypes} />
        <select
          onChange={(event) => setAttendanceFilter(event.target.value as AttendanceFilterType)}
          value={attendanceFilter}
        >
          {Object.entries(ATTENDANCE_FILTERS).map(([value, description]) => (
            <option key={value} value={value}>
              {description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const selectCurrentPage = () => (state: State) => {
  return state.events.search.page;
};

export default SearchModule;
