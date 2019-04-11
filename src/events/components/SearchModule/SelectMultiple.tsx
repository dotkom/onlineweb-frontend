import React, { ChangeEvent, FC } from 'react';
import { EventTypeEnum, getEventType } from '../../models/Event';

const selectItems = () => {
  const eventTypeNumberList = Array(Object.keys(EventTypeEnum).length / 2 - 1)
    .fill(1)
    .map((x, y) => x + y);

  return eventTypeNumberList.map((eventType) => (
    <option key={eventType} value={eventType}>
      {getEventType(eventType)}
    </option>
  ));
};

export interface IProps {
  eventTypes: EventTypeEnum[];
  onEventTypesInput: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectMultiple: FC<IProps> = ({ eventTypes, onEventTypesInput }) => (
  <select onChange={onEventTypesInput} value={eventTypes.map((item) => item.toString())} multiple>
    {selectItems()}
  </select>
);