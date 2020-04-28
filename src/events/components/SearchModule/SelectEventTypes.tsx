import React, { FC } from 'react';
import { ValueType } from 'react-select/src/types';

import { SelectMultiple, ISelectable } from 'common/components/Forms/SelectMultiple';
import { DEFAULT_EVENT_TYPES_PARAM } from 'core/hooks/useQueryParamsState';
import { EventType, EventTypeEnum, getEventColor, getEventType } from 'events/models/Event';

const options = JSON.parse(DEFAULT_EVENT_TYPES_PARAM).map((eventType: EventTypeEnum) => ({
  value: eventType,
  label: getEventType(eventType),
}));

export interface IProps {
  selected: EventTypeEnum[];
  onChange: (value: EventTypeEnum[]) => void;
}

export const SelectEventTypes: FC<IProps> = ({ selected = [], onChange }) => {
  const handleChange = (value: ValueType<ISelectable<EventTypeEnum, EventType>>) => {
    if (value !== null) {
      const actualValue = value as Array<ISelectable<EventTypeEnum, EventType>>;
      const newEventTypes = actualValue.map((e) => e.value);
      if (newEventTypes.length > 0) {
        onChange(newEventTypes);
      } else {
        onChange([]);
      }
    }
  };
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
      onChange={handleChange}
    />
  );
};
