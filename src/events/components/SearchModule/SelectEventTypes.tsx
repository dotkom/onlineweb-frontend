import React, { FC } from 'react';
import { ValueType } from 'react-select/lib/types';

import { ISelectable, SelectMultiple } from 'common/components/Forms/SelectMultiple';
import { DEFAULT_EVENT_TYPES_PARAM } from 'core/hooks/useQueryParamsState';
import { EventType, EventTypeEnum, getEventColor, getEventType } from 'events/models/Event';

const options = JSON.parse(DEFAULT_EVENT_TYPES_PARAM).map((eventType: EventTypeEnum) => ({
  value: eventType,
  label: getEventType(eventType),
}));

export interface IProps {
  selected: EventTypeEnum[];
  onChange: (value: ValueType<ISelectable<EventTypeEnum, EventType>>) => void;
}

export const SelectEventTypes: FC<IProps> = ({ selected = [], onChange }) => {
  const selectedItems = selected.map((eventType) => ({
    value: eventType,
    label: getEventType(eventType),
  }));
  return (
    <SelectMultiple<EventTypeEnum, EventType>
      placeholder="Velg arrangementstyper..."
      selectOptions={options}
      selected={selectedItems}
      getColor={(type) => getEventColor(type)}
      onChange={onChange}
    />
  );
};
