import React, { ChangeEvent, FC } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { EventTypeEnum, getEventColor, getEventType } from '../../models/Event';
import style from './search.less';

const selectItems = () => {
  const eventTypeNumberList = Array(Object.keys(EventTypeEnum).length / 2 - 1)
    .fill(1)
    .map((x, y) => x + y);
  return eventTypeNumberList.map((eventType) => ({ value: eventType, label: getEventType(eventType) }));
};

const optionStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles: any, { data, isFocused }: any) => {
    return {
      ...styles,
      backgroundColor: isFocused ? getEventColor(data.value) : null,
      color: isFocused ? 'white' : '#7f7f7f',
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const eventColor = getEventColor(data.value);
    return {
      ...styles,
      backgroundColor: eventColor,
    };
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: 'white',
    ':hover': {
      color: '#ff5d5d',
    },
  }),
};

export interface IProps {
  eventTypes: EventTypeEnum[];
  onEventTypesInput: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectMultiple: FC<IProps> = ({ eventTypes, onEventTypesInput }) => (
  <Select
    options={selectItems()}
    onChange={onEventTypesInput}
    isMulti
    styles={optionStyles}
    defaultValue={eventTypes.map((event) => ({ value: event, label: getEventType(event) }))}
    components={makeAnimated()}
    closeMenuOnSelect={false}
    placeholder={'Arrangementtype...'}
    className={style.eventType}
  />
);
