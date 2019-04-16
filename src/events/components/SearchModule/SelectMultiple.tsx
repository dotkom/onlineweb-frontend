import React, { ChangeEvent, FC } from 'react';
import { EventTypeEnum, getEventType, getEventColor } from '../../models/Event';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const selectItems = (events) => {
  const eventTypeNumberList = Array(Object.keys(EventTypeEnum).length / 2 - 1)
    .fill(1)
    .map((x, y) => x + y);

  return eventTypeNumberList.map((eventType) => ({value: eventType, label: getEventType(eventType)}));	
};

const optionStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? getEventColor(data.value) : null,
      color: isFocused ? 'white' : '#7f7f7f',
    };
  },
  multiValue: (styles, { data }) => {
    const eventColor = getEventColor(data.value);
    return {
      ...styles,
      backgroundColor: eventColor,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white', 
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: 'white',
    ':hover': {
      color: '#ff5d5d', 
    }
  }),
};



export interface IProps {
  eventTypes: EventTypeEnum[];
  onEventTypesInput: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectMultiple: FC<IProps> = ({ onEventTypesInput }) => (
	<Select 
	    options={selectItems()} 
	    onChange={onEventTypesInput}
	    isMulti
	    styles={optionStyles}
	    components={makeAnimated()}
	    closeMenuOnSelect={false}
	    placeholder={'Arrangement...'}
	/>
);
