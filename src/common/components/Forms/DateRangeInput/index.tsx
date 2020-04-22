import { DateTime } from 'luxon';
import React, { FC, useRef } from 'react';
import { DayPickerProps } from 'react-day-picker/types/props';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { FIRST_DAY_OF_WEEK, LOCALE, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from 'common/constants/intl';

import style from './datePicker.less';

/** Static properties used by both DayPickerInputs */
const COMMON_DAY_PICKER_PROPS: DayPickerProps = {
  locale: LOCALE,
  months: MONTHS,
  weekdaysLong: WEEKDAYS_LONG,
  weekdaysShort: WEEKDAYS_SHORT,
  firstDayOfWeek: FIRST_DAY_OF_WEEK,
  labels: { nextMonth: 'Neste måned', previousMonth: 'Forrige måned' },
};

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
    ...COMMON_DAY_PICKER_PROPS,
    selectedDays: [dateStart, { from: dateStart, to: dateEnd }],
    disabledDays: { after: dateEnd },
    month: dateStart,
    modifiers,
    onDayClick: () => {
      if (inputRef.current) {
        inputRef.current.getInput().focus();
      }
    },
  };

  const toMonthProps: DayPickerProps = {
    ...COMMON_DAY_PICKER_PROPS,
    selectedDays: [dateStart, { from: dateStart, to: dateEnd }],
    disabledDays: { before: dateStart },
    modifiers,
    month: dateEnd,
  };

  const formatDate = (day: Date) => {
    return DateTime.fromJSDate(day).toLocaleString(DateTime.DATE_FULL);
  };

  return (
    <div className={style.inputFromTo}>
      <span>Fra </span>
      <DayPickerInput
        value={dateStart}
        placeholder="Fra"
        formatDate={formatDate}
        format="LL"
        dayPickerProps={fromMonthProps}
        onDayChange={(day: Date) => handleFromDateClick(DateTime.fromJSDate(day))}
      />
      <span> til </span>
      <span className={style.inputFromToTo}>
        <DayPickerInput
          ref={inputRef}
          value={dateEnd}
          placeholder="Til"
          formatDate={formatDate}
          format="LL"
          dayPickerProps={toMonthProps}
          onDayChange={(day: Date) => handleToDateClick(DateTime.fromJSDate(day))}
        />
      </span>
    </div>
  );
};
