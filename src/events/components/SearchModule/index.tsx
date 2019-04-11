import React, { ChangeEvent, FC } from 'react';
import style from '../../../profile/components/Search/search.less';
import { EventTypeEnum } from '../../models/Event';
import DateInput from './DateInput';
import { SelectMultiple } from './SelectMultiple';

export interface IProps {
  searchText: string;
  dateStart: string;
  dateEnd: string;
  eventTypes: EventTypeEnum[] | EventTypeEnum;
  onTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeStartInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeEndInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onEventTypesInput: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchModule: FC<IProps> = ({
  searchText,
  dateStart,
  dateEnd,
  eventTypes,
  onTextInput,
  onTimeEndInput,
  onTimeStartInput,
  onEventTypesInput,
}) => {
  return (
    <div className={style.grid}>
      <input
        className={style.searchInput}
        type="search"
        defaultValue={searchText}
        placeholder="Søk"
        onChange={onTextInput}
      />
      <DateInput label="Fra: " time={dateStart} onChange={onTimeStartInput} />
      <DateInput label="Til: " time={dateEnd} onChange={onTimeEndInput} />
      <SelectMultiple onEventTypesInput={onEventTypesInput} eventTypes={eventTypes} />
    </div>
  );
};

export default SearchModule;
