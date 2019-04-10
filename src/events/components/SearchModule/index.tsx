import React, { ChangeEvent, FC } from 'react';
import style from '../../../profile/components/Search/search.less';
import { EventTypeEnum, getEventType } from '../../models/Event'; // , { useContext, useEffect }
import DateInput from './DateInput';

// import { EventTypeEnum, IEvent } from '../../models/Event';

export interface IProps {
  searchText: string;
  timeStart: string;
  timeEnd: string;
  onTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeStartInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeEndInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const selectItems = () => {
  const eventTypeNumberList = Array(Object.keys(EventTypeEnum).length / 2 - 1)
    .fill(1)
    .map((x, y) => x + y);

  return eventTypeNumberList.map((eventType) => (
    <option key={eventType} value={eventType}>
      {getEventType(eventType)}
    </option>
  ));
};

const SearchModule: FC<IProps> = ({
  searchText,
  timeStart,
  timeEnd,
  onTextInput,
  onTimeEndInput,
  onTimeStartInput,
}) => {
  return (
    <div className={style.grid}>
      <input className={style.searchInput} type="search" value={searchText} placeholder="Søk" onChange={onTextInput} />
      <DateInput label="Fra: " time={timeStart} onChange={onTimeStartInput} />
      <DateInput label="Til: " time={timeEnd} onChange={onTimeEndInput} />
      <select multiple>{selectItems()}</select>
    </div>
  );
};

export default SearchModule;
