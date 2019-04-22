import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { ValueType } from 'react-select/lib/types';
import ToggleSwitch from '../../../common/components/ToggleSwitch';
import { useQueryParam } from '../../../common/hooks/useQueryParam';
import {
  DEFAULT_DATE_END_PARAM,
  DEFAULT_DATE_START_PARAM,
  DEFAULT_SEARCH_PARAM,
} from '../../../core/hooks/useQueryParamsState';
import { EventType, EventTypeEnum, getEventType } from '../../models/Event';
import { DateRangeInput } from './DateRangeInput';
import style from './search.less';
import { SelectMultiple } from './SelectMultiple';

const SearchModule: FC = () => {
  const [search, setSearch] = useQueryParam('search');
  const [dateStart, setDateStart] = useQueryParam('dateStart');
  const [dateEnd, setDateEnd] = useQueryParam('dateEnd');
  const [eventTypes, setEventTypes] = useQueryParam('eventTypes');
  const [attendanceEventsChecked, setAttendanceEventsChecked] = useQueryParam('attendanceEvents');

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

  const selectedItems =
    eventTypes !== null
      ? JSON.parse(eventTypes).map((eventType: EventTypeEnum) => ({
          value: eventType,
          label: getEventType(eventType),
        }))
      : null;

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
    setAttendanceEventsChecked(
      attendanceEventsChecked === 'false' ? 'true' : 'false'
    );

  return (
    <>
      <div className={style.grid}>
        <input
          className={style.searchInput}
          type="search"
          defaultValue={search || DEFAULT_SEARCH_PARAM}
          placeholder="Søk"
          onChange={(event) => setSearch(event.target.value)}
        />
        <label className={style.attendanceEvent}>
          <span>Vis arrangementer uten påmelding</span>
          <ToggleSwitch
            onChange={onToggleSwitchChange}
            checked={attendanceEventsChecked === 'false'}
          />
        </label>
        <DateRangeInput
          dateEnd={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM)}
          dateStart={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM)}
          handleFromDateClick={handleFromDateClick}
          handleToDateClick={handleToDateClick}
        />
        <SelectMultiple value={selectedItems} onEventTypesInput={onEventTypesInput} />
      </div>
    </>
  );
};

export default SearchModule;
