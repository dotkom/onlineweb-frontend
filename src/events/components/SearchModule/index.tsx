import { DateTime } from 'luxon';
import React, { FC } from 'react';
import ToggleSwitch from '../../../common/components/ToggleSwitch';
import { useQueryParam } from '../../../common/hooks/useQueryParam';
import {
  defaultDateEndParam,
  defaultDateStartParam,
  defaultEventTypesParam,
  defaultSearchParam,
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

  return (
    <div className={style.grid}>
      <input
        className={style.searchInput}
        type="search"
        defaultValue={search || defaultSearchParam}
        placeholder="Søk"
        onChange={(event) => setSearch(event.target.value)}
      />
      <DateInput
        label="Fra: "
        time={DateTime.fromISO(dateStart || defaultDateStartParam).toFormat('yyyy-MM-dd')}
        onChange={(event) => setDateStart(event.target.value)}
      />
      <DateInput
        label="Til: "
        time={DateTime.fromISO(dateEnd || defaultDateEndParam).toFormat('yyyy-MM-dd')}
        onChange={(event) => setDateEnd(event.target.value)}
      />
      <SelectMultiple
        onEventTypesInput={(event) =>
          setEventTypes(
            JSON.stringify(
              [...event.target.options]
                .filter((eventType) => eventType.selected)
                .map((eventType) => parseInt(eventType.value, 10))
            )
          )
        }
        eventTypes={JSON.parse(eventTypes || defaultEventTypesParam)}
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
