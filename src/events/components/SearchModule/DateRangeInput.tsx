import { DateTime } from 'luxon';
import React, { FC, MutableRefObject, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export interface IProps {
  dateStart: DateTime;
  dateEnd: DateTime;
  handleResetClick: () => void;
  handleToDateClick: (day: Date) => void;
  handleFromDateClick: (day: Date) => void;
}

export const DateRangeInput: FC<IProps> = ({
  dateStart,
  dateEnd,
  handleToDateClick,
  handleFromDateClick,
  handleResetClick,
}) => {
  const modifiers = { start: dateStart.toJSDate(), end: dateEnd.toJSDate() };
  const toInput = useRef(null) as MutableRefObject<null | DayPickerInput>;

  return (
    <div className="InputFromTo">
      <button onClick={handleResetClick}>Rest</button>
      <DayPickerInput
        value={dateStart.toJSDate()}
        placeholder="Fra"
        format={'YYYY-M-D'}
        dayPickerProps={{
          selectedDays: [dateStart.toJSDate(), { from: dateStart.toJSDate(), to: dateEnd.toJSDate() }],
          disabledDays: { after: dateEnd.toJSDate() },
          toMonth: dateEnd.toJSDate(),
          modifiers,
          numberOfMonths: 2,
          onDayClick: () => {
            if (toInput.current) {
              toInput.current.getInput().focus();
            }
          },
        }}
        onDayChange={handleFromDateClick}
      />{' '}
      —{' '}
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={(el) => (toInput.current = el)}
          value={dateEnd.toJSDate()}
          placeholder="Til"
          format={'YYYY-M-D'}
          dayPickerProps={{
            selectedDays: [dateStart.toJSDate(), { from: dateStart.toJSDate(), to: dateEnd.toJSDate() }],
            disabledDays: { before: dateStart.toJSDate() },
            modifiers,
            month: dateStart.toJSDate(),
            fromMonth: dateStart.toJSDate(),
            numberOfMonths: 2,
          }}
          onDayChange={handleToDateClick}
        />
      </span>
    </div>
  );
};
