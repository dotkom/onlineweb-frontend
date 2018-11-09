import {  Calendar, CalendarDatum } from '@nivo/calendar';
import Markdown from 'common/components/Markdown';
import { DateTime } from 'luxon';
import React from 'react';

const ABOUT_ORDER_CALENDAR = `
  # Ordrehistorikk
`;

export interface IProps {
  frequency: DateTime[]; // Datetime
}

const OrderFrequency = ({ frequency }: IProps) => {
  const last = frequency[frequency.length - 1]
  const first = last.minus({ years: 1 });
  const filtered = frequency.filter((a) => first < a)
  const dateStrings = frequency.map((date) => date.toISODate());
  const inter: Array<{[date: string]: number}> = dateStrings.map((date) => ({[date]: 1}));
  const inter2: {[date: string]: number} = inter.reduce((prev, curr) => {
    const key = Object.keys(curr)[0];
    return {...prev, [key]: (prev[key] + 1 || 1)}
  })
  const values: CalendarDatum[] = Object.keys(inter2).map((key) => ({ day: key, value: inter2[key] }))
  return (
    <div>
      <Markdown source={ABOUT_ORDER_CALENDAR}/>
      <Calendar
        width={1000}
        height={450}
        from={first.toISODate()}
        to={last.toISODate()}
        data={values}
        emptyColor="#eeeeee"
          colors={[
              '#61cdbb',
              '#97e3d5',
              '#e8c1a0',
              '#f47560'
          ]}
          margin={{
              top: 60,
              right: 30,
              bottom: 40,
              left: 30
          }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          monthLegendOffset={10}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 34,
                  itemHeight: 36,
                  itemDirection: 'top-to-bottom'
              }
          ]}
      />
    </div>
  )
}

export default OrderFrequency;
