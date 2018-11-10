import { Calendar, CalendarDatum, CalendarLegend } from '@nivo/calendar';
import { DateTime } from 'luxon';
import React from 'react';
import style from './orders.less';

export interface IProps {
  frequency: DateTime[]; // Datetime
}

const COLORS = {
  colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
  emptyColor: '#eeeeee',
  monthBorderColor: '#ffffff',
  dayBorderColor: '#ffffff',
};

const MARGINS = {
  margin: { top: 60, right: 30, bottom: 40, left: 30 },
  yearSpacing: 40,
  monthLegendOffset: 10,
  dayBorderWidth: 2,
};

const LEGENDS: CalendarLegend[] = [
  {
    anchor: 'bottom-right',
    direction: 'row',
    translateY: 36,
    itemCount: 4,
    itemWidth: 34,
    itemHeight: 36,
    itemDirection: 'top-to-bottom',
  },
];

const OrderFrequency = ({ frequency }: IProps) => {
  const last = frequency[frequency.length - 1];
  const first = last.minus({ years: 1 });
  const filtered = frequency.filter((a) => first < a);
  const dateStrings = frequency.map((date) => date.toISODate());
  const inter: Array<{ [date: string]: number }> = dateStrings.map((date) => ({ [date]: 1 }));
  const inter2: { [date: string]: number } = inter.reduce((prev, curr) => {
    const key = Object.keys(curr)[0];
    return { ...prev, [key]: prev[key] + 1 || 1 };
  });
  const values: CalendarDatum[] = Object.keys(inter2).map((key) => ({ day: key, value: inter2[key] }));
  return (
    <div className={style.centerChart}>
      <h1>Kjøpskalender</h1>
      <Calendar
        width={1000}
        height={450}
        from={first.toISODate()}
        to={last.toISODate()}
        data={values}
        legends={LEGENDS}
        {...COLORS}
        {...MARGINS}
      />
    </div>
  );
};

export default OrderFrequency;
