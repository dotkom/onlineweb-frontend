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
import DateInput from './DateInput';
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
        label="Fra: "
        time={DateTime.fromISO(dateStart || DEFAULT_DATE_START_PARAM).toFormat('yyyy-MM-dd')}
        onChange={(event) => setDateStart(event.target.value)}
      />
      <DateInput
        label="Til: "
        time={DateTime.fromISO(dateEnd || DEFAULT_DATE_END_PARAM).toFormat('yyyy-MM-dd')}
        onChange={(event) => setDateEnd(event.target.value)}
      />
      <SelectMultiple
        onEventTypesInput={onEventTypesInput}
        eventTypes={JSON.parse(eventTypes || DEFAULT_EVENT_TYPES_PARAM)}
      />
      <label>
        Vis arrangementer med påmelding
        <ToggleSwitch
          onChange={() => setAttendanceEventsChecked(attendanceEventsChecked === 'true' ? 'false' : 'true')}
          checked={attendanceEventsChecked === 'true'}
        />
      </label>
    </div>
  );
};

export default SearchModule;
