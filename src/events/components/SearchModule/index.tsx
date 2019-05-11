import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { ValueType } from 'react-select/lib/types';

import { DateRangeInput } from 'common/components/Forms/DateRangeInput';
import { SearchInput } from 'common/components/Forms/SearchInput';
import ToggleSwitch from 'common/components/ToggleSwitch';
import { useQueryParam } from 'common/hooks/useQueryParam';
import { DEFAULT_DATE_END_PARAM, DEFAULT_DATE_START_PARAM, DEFAULT_SEARCH_PARAM } from 'core/hooks/useQueryParamsState';
import { EventType, EventTypeEnum } from 'events/models/Event';

import style from './search.less';
import { SelectEventTypes } from './SelectEventTypes';

const SearchModule: FC = () => {
  const [search, setSearch] = useQueryParam('search');
  const [dateStart, setDateStart] = useQueryParam('dateStart');
  const [dateEnd, setDateEnd] = useQueryParam('dateEnd');
  const [eventTypes, setEventTypes] = useQueryParam('eventTypes');
  const [nonAttendanceEventsChecked, setNonAttendanceEventsChecked] = useQueryParam('nonAttendanceEvents');

  const onEventTypesInput = (value: ValueType<{ value: EventTypeEnum; label: EventType }>) => {
    if (value !== null) {
      const actualValue = value as Array<{ value: EventTypeEnum; label: EventType }>;
      const newEventTypes = actualValue.map((e) => e.value);
      if (newEventTypes.length > 0) {
        setEventTypes(JSON.stringify(newEventTypes));
      } else {
        setEventTypes(null);
      }
    }
  };

  const handleToDateClick = (day: DateTime) => {
    const dateTime = day.set({ hour: 0 });
    const dateTimeStart = DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM);

    if (dateTime > dateTimeStart || dateTime.toISODate() === dateTimeStart.toISODate()) {
      setDateEnd(dateTime.toISODate());
    }
  };

  const handleFromDateClick = (day: DateTime) => {
    const dateTime = day.set({ hour: 0 });
    const dateTimeEnd = DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM);

    if (dateTime < dateTimeEnd || dateTime.toISODate() === dateTimeEnd.toISODate()) {
      setDateStart(dateTime.toISODate());
    }
  };

  const onToggleSwitchChange = () =>
    setNonAttendanceEventsChecked(nonAttendanceEventsChecked === 'false' ? 'true' : 'false');

  return (
    <>
      <div className={style.grid}>
        <SearchInput
          defaultValue={search || DEFAULT_SEARCH_PARAM}
          onChange={(event) => setSearch(event.target.value)}
        />
        <label className={style.attendanceEvent}>
          <span>Vis arrangementer uten påmelding</span>
          <ToggleSwitch onChange={onToggleSwitchChange} checked={!(nonAttendanceEventsChecked === 'false')} />
        </label>
        <DateRangeInput
          dateEnd={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM)}
          dateStart={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM)}
          handleFromDateClick={handleFromDateClick}
          handleToDateClick={handleToDateClick}
        />
        <SelectEventTypes selected={eventTypes ? JSON.parse(eventTypes) : []} onChange={onEventTypesInput} />
      </div>
    </>
  );
};

export default SearchModule;
