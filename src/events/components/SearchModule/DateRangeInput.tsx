import { DateTime } from 'luxon';
import React, { FC, useRef } from 'react';
import { DayPickerProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import style from './search.less';

const WEEKDAYS_SHORT = ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'];
const MONTHS = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const WEEKDAYS_LONG = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

const FIRST_DAY_OF_WEEK = 1;

const LABELS = { nextMonth: 'Neste måned', previousMonth: 'Forrige måned' };

export interface IProps {
  dateStart: DateTime;
  dateEnd: DateTime;
  handleToDateClick: (day: DateTime) => void;
  handleFromDateClick: (day: DateTime) => void;
}

export const DateRangeInput: FC<IProps> = ({
  dateStart: dateTimeStart,
  dateEnd: dateTimeEnd,
  handleToDateClick,
  handleFromDateClick,
}) => {
  const dateStart = dateTimeStart.toJSDate();
  const dateEnd = dateTimeEnd.toJSDate();

  const modifiers = { start: dateStart, end: dateEnd };
  const inputRef = useRef<DayPickerInput>(null);

  const fromMonthProps: DayPickerProps = {
    selectedDays: [dateStart, { from: dateStart, to: dateEnd }],
    disabledDays: { after: dateEnd },
    toMonth: dateEnd,
    modifiers,
    numberOfMonths: 2,
    onDayClick: () => {
      if (inputRef.current) {
        inputRef.current.getInput().focus();
      }
    },
    locale: 'no',
    months: MONTHS,
    weekdaysLong: WEEKDAYS_LONG,
    weekdaysShort: WEEKDAYS_SHORT,
    firstDayOfWeek: FIRST_DAY_OF_WEEK,
    labels: LABELS,
  };

  const toMonthProps: DayPickerProps = {
    selectedDays: [dateStart, { from: dateStart, to: dateEnd }],
    disabledDays: { before: dateStart },
    modifiers,
    month: dateStart,
    fromMonth: dateStart,
    numberOfMonths: 2,
    locale: 'no',
    months: MONTHS,
    weekdaysLong: WEEKDAYS_LONG,
    weekdaysShort: WEEKDAYS_SHORT,
    firstDayOfWeek: FIRST_DAY_OF_WEEK,
    labels: LABELS,
  };

  return (
    <div className={style.inputFromTo}>
      <DayPickerInput
        value={dateStart}
        placeholder="Fra"
        format={'YYYY-M-D'}
        dayPickerProps={fromMonthProps}
        onDayChange={(day: Date) => handleFromDateClick(DateTime.fromJSDate(day))}
      />{' '}
      —{' '}
      <span className={style.inputFromToTo}>
        <DayPickerInput
          ref={inputRef}
          value={dateEnd}
          placeholder="Til"
          format={'YYYY-M-D'}
          dayPickerProps={toMonthProps}
          onDayChange={(day: Date) => handleToDateClick(DateTime.fromJSDate(day))}
        />
      </span>
    </div>
  );
};
