import { CalendarDatum, CalendarLegend, ResponsiveCalendar } from '@nivo/calendar';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';
import style from './charts.less';

export interface IProps {
  frequency: DateTime[];
  header: string;
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

interface IFrequncyCount {
  [date: string]: number;
}

const CalendarChart = ({ frequency, header }: IProps) => {
  const last = frequency[frequency.length - 1];
  const first = last.minus({ years: 1 });
  const dateStrings = frequency.map((date) => date.toISODate());
  const inter: IFrequncyCount[] = dateStrings.map((date) => ({ [date]: 1 }));
  const inter2: IFrequncyCount = inter.reduce((prev, curr) => {
    const key = Object.keys(curr)[0];
    return { ...prev, [key]: prev[key] + 1 || 1 };
  });
  const values: CalendarDatum[] = Object.keys(inter2).map((key) => ({ day: key, value: inter2[key] }));
  return (
    <div className={classnames(style.centerChart, style.calendarChart)}>
      <h1>{header}</h1>
      <ResponsiveCalendar
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

export default CalendarChart;
