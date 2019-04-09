import React, {ChangeEvent, FC} from 'react'; // , { useContext, useEffect }
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

const SearchModule: FC<IProps> = ({ searchText, timeStart, timeEnd, onTextInput, onTimeEndInput, onTimeStartInput }) => {
  return (
    <>
      <DateInput label={'Fra: '} time={timeStart} onChange={onTimeStartInput}/>
      <DateInput label={'Til: '} time={timeEnd} onChange={onTimeEndInput}/>
      <input type="text" value={searchText} placeholder="Søk" onChange={onTextInput}/>
    </>
  );
};

export default SearchModule;
