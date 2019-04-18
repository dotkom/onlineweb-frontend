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
import './dateRangeInput.css';
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

  const handleToDateClick = (day: Date) => {
    const clonedDate: Date = new Date(day.getTime());
    const datetime = DateTime.fromJSDate(new Date(clonedDate.setHours(0, 0, 0, 0)));
    const dateEndDateTime = DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM);
    const dateStartDateTime = DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM);

    if (datetime.toISODate() !== dateStartDateTime.toISODate() && datetime > dateEndDateTime) {
      setDateEnd(datetime.toISODate());
    } else if (datetime.toISODate() === dateStartDateTime.toISODate()) {
      setDateEnd(datetime.toISODate());
    }
  };

  const handleFromDateClick = (day: Date) => {
    const clonedDate: Date = new Date(day.getTime());
    const datetime = DateTime.fromJSDate(new Date(clonedDate.setHours(0, 0, 0, 0)));
    const dateEndDateTime = DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM);
    const dateStartDateTime = DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM);

    if (datetime < dateStartDateTime) {
      setDateStart(datetime.toISODate());
    } else if (datetime.toISODate() === dateEndDateTime.toISODate()) {
      setDateStart(datetime.toISODate());
    }
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
            onChange={() =>
              setAttendanceEventsChecked(
                attendanceEventsChecked === 'true' || attendanceEventsChecked === null ? 'false' : 'true'
              )
            }
            checked={attendanceEventsChecked === 'true' || attendanceEventsChecked === null}
          />
        </label>
      </div>
      <DateRangeInput
        dateEnd={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM)}
        dateStart={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM)}
        handleFromDateClick={handleFromDateClick}
        handleToDateClick={handleToDateClick}
        handleResetClick={() => {
          setDateStart(DEFAULT_DATE_START_PARAM);
          setDateEnd(DEFAULT_DATE_END_PARAM);
        }}
      />
    </>
  );
};

export default SearchModule;
