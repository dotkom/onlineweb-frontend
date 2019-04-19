import { DateTime } from 'luxon';
import React, { ChangeEvent, FC } from 'react';
import ToggleSwitch from '../../../common/components/ToggleSwitch';
import { useQueryParam } from '../../../common/hooks/useQueryParam';
import {
  DEFAULT_DATE_END_PARAM,
  DEFAULT_DATE_START_PARAM,
  DEFAULT_EVENT_TYPES_PARAM,
  DEFAULT_SEARCH_PARAM,
} from '../../../core/hooks/useQueryParamsState';
import style from '../../../profile/components/Search/search.less';
import { DateRangeInput } from './DateRangeInput';
import { SelectMultiple } from './SelectMultiple';

const SearchModule: FC = () => {
  const [search, setSearch] = useQueryParam('search');
  const [dateStart, setDateStart] = useQueryParam('dateStart');
  const [dateEnd, setDateEnd] = useQueryParam('dateEnd');
  const [eventTypes, setEventTypes] = useQueryParam('eventTypes');
  const [attendanceEventsChecked, setAttendanceEventsChecked] = useQueryParam('attendanceEvents');

  const onEventTypesInput = (event: ChangeEvent<HTMLSelectElement>) =>
    setEventTypes(
      JSON.stringify(
        [...event.target.options]
          .filter((eventType) => eventType.selected)
          .map((eventType) => parseInt(eventType.value, 10))
      )
    );

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
      attendanceEventsChecked === 'true' || attendanceEventsChecked === null ? 'false' : 'true'
    );

  const handleDateResetClick = () => {
    setDateStart(DEFAULT_DATE_START_PARAM);
    setDateEnd(DEFAULT_DATE_END_PARAM);
  };

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
        <SelectMultiple
          onEventTypesInput={onEventTypesInput}
          eventTypes={JSON.parse(eventTypes || DEFAULT_EVENT_TYPES_PARAM)}
        />
        <label>
          Vis arrangementer med påmelding
          <ToggleSwitch
            onChange={onToggleSwitchChange}
            checked={attendanceEventsChecked === 'true' || attendanceEventsChecked === null}
          />
        </label>
      </div>
      <DateRangeInput
        dateEnd={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM)}
        dateStart={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM)}
        handleFromDateClick={handleFromDateClick}
        handleToDateClick={handleToDateClick}
        handleResetClick={handleDateResetClick}
      />
    </>
  );
};

export default SearchModule;
