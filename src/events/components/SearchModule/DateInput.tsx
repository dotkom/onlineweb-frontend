import React, { ChangeEvent, FC } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from './search.less';

export interface IProps {
  label: string;
  time: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: FC<IProps> = ({ startDate, endDate, onChange }) => {
  return (
    <div className={style.dateInput}>
	<DatePicker
	    selected={startDate}
	    selectsStart
	    dateFormat="MMMM d, yyyy"
	    startDate={startDate}
	    endDate={endDate}
	    onChange={onChange}
	/>
	<DatePicker
	    selected={endDate}
	    selectsEnd
	    dateFormat="MMMM d, yyyy"
	    startDate={startDate}
	    endDate={endDate}
	    onChange={onChange}
	/>
    </div>
  );
};

export default DateInput;
