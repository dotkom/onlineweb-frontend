import { Pie, PieDatum } from '@nivo/pie';
import { getEventColor, getEventType, INewEvent } from 'events/models/Event';
import React from 'react';
import style from '../Orders/orders.less';

export interface IProps {
  events: INewEvent[];
}

const getColor = ({ label }: PieDatum): string => {
  if (typeof label === 'number') {
    return getEventColor(label);
  }
  return 'gray';
};

export interface ITypeCount {
  [key: string]: number;
}

function countEventTypes(events: INewEvent[]): ITypeCount {
  return events.reduce<ITypeCount>(
    (counted, event) => ({
      ...counted,
      [event.event_type]: counted[event.event_type] + 1 || 1,
    }),
    {}
  );
}

const createPieDatum = (count: ITypeCount) => {
  return Object.keys(count).map((key) => ({
    label: Number(key),
    value: count[key],
    id: getEventType(Number(key)),
  }));
};

const EventTypeDonut = ({ events }: IProps) => {
  const typeCount = countEventTypes(events);
  const eventTypes = createPieDatum(typeCount);
  return (
    <div className={style.centerChart}>
      <h1>Arrangementstyper</h1>
      <Pie
        data={eventTypes}
        height={300}
        width={350}
        fit
        animate
        innerRadius={0.6}
        colorBy={getColor}
        margin={{ top: 60, right: 30, bottom: 40, left: 30 }}
      />
    </div>
  );
};

export default EventTypeDonut;
