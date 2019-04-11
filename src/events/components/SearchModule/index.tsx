import React, { ChangeEvent, FC, useContext } from 'react';
import { QueryParams } from '../../../core/providers/QueryParams';
import style from '../../../profile/components/Search/search.less';
import DateInput from './DateInput';
import { SelectMultiple } from './SelectMultiple';

export interface IProps {
  onTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeStartInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onTimeEndInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onEventTypesInput: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchModule: FC<IProps> = ({ onTextInput, onTimeEndInput, onTimeStartInput, onEventTypesInput }) => {
  const { search, dateStart, dateEnd, eventTypes } = useContext(QueryParams);

  return (
    <div className={style.grid}>
      <input
        className={style.searchInput}
        type="search"
        defaultValue={search}
        placeholder="Søk"
        onChange={onTextInput}
      />
      <DateInput label="Fra: " time={dateStart.toFormat('yyyy-MM-dd')} onChange={onTimeStartInput} />
      <DateInput label="Til: " time={dateEnd.toFormat('yyyy-MM-dd')} onChange={onTimeEndInput} />
      <SelectMultiple onEventTypesInput={onEventTypesInput} eventTypes={eventTypes} />
    </div>
  );
};

export default SearchModule;
