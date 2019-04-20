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
import DateInput from './DateInput';
import DatePicker from './DatePicker';
import style from './search.less';
import { SelectMultiple } from './SelectMultiple';

const SearchModule: FC = () => {
  const [search, setSearch] = useQueryParam('search');
  const [dateStart, setDateStart] = useQueryParam('dateStart');
  const [dateEnd, setDateEnd] = useQueryParam('dateEnd');
  const [eventTypes, setEventTypes] = useQueryParam('eventTypes');
  const [attendanceEventsChecked, setAttendanceEventsChecked] = useQueryParam('attendanceEvents');

  const onEventTypesInput = (event: ChangeEvent<HTMLSelectElement>) =>
    setEventTypes(JSON.stringify(event.map((option) => option.value)));

  return (
    <div className={style.grid}>
      <input
        className={style.searchInput}
        type="search"
        defaultValue={search || DEFAULT_SEARCH_PARAM}
        placeholder="Søk"
        onChange={(event) => setSearch(event.target.value)}
      />
      <DateInput
	  startDate={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM).toJSDate()}
	  endDate={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM).toJSDate()}
          onChange={(event) => console.log(event)}
      />
      <SelectMultiple
        onEventTypesInput={onEventTypesInput}
        eventTypes={JSON.parse(eventTypes || DEFAULT_EVENT_TYPES_PARAM)}
      />
      <label className={style.attendanceEvent}>
        <span>Vis arrangementer uten påmelding</span>
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
  );
};

export default SearchModule;
