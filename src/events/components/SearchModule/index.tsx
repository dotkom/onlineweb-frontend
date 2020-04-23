import React, { FC, useState, useEffect } from 'react';

import { SearchInput } from 'common/components/Forms/SearchInput';
import ToggleSwitch from 'common/components/ToggleSwitch';
import { useDispatch } from 'core/redux/hooks';
import { EventTypeEnum } from 'events/models/Event';

import style from './search.less';
import { SelectEventTypes } from './SelectEventTypes';
import { filterEvents } from 'events/slices/events';

const SearchModule: FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [eventTypes, setEventTypes] = useState<EventTypeEnum[]>([]);
  const [showOnlyAttendanceEvents, setShowOnlyAttendanceEvents] = useState(false);

  const toggleShowOnlyAttendanceEvents = () => {
    setShowOnlyAttendanceEvents((current) => !current);
  };

  useEffect(() => {
    dispatch(filterEvents({ query, eventTypes, showOnlyAttendanceEvents }));
  }, [query, showOnlyAttendanceEvents, String(eventTypes)]);

  return (
    <div className={style.grid}>
      <SearchInput defaultValue={query} onChange={(event) => setQuery(event.target.value)} />
      <label className={style.attendanceEvent}>
        <span>Vis kun arrangementer med påmelding</span>
        <ToggleSwitch onChange={toggleShowOnlyAttendanceEvents} checked={showOnlyAttendanceEvents} />
      </label>
      <SelectEventTypes selected={eventTypes} onChange={setEventTypes} />
    </div>
  );
};

export default SearchModule;
