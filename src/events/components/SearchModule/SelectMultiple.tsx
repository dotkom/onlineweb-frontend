import React, { CSSProperties, FC } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Styles } from 'react-select/lib/styles';
import { ValueType } from 'react-select/lib/types';
import { DEFAULT_EVENT_TYPES_PARAM } from '../../../core/hooks/useQueryParamsState';
import { EventType, EventTypeEnum, getEventColor, getEventType } from '../../models/Event';
import style from './search.less';

const options = JSON.parse(DEFAULT_EVENT_TYPES_PARAM).map((eventType: EventTypeEnum) => ({
  value: eventType,
  label: getEventType(eventType),
}));

const optionStyles: Partial<Styles> = {
  control: (styles: CSSProperties) => ({ ...styles, backgroundColor: 'white' }),
  // tslint:disable-next-line no-any , the input is actually any
  option: (styles: CSSProperties, { data, isFocused }: any) => {
    return {
      ...styles,
      backgroundColor: isFocused ? getEventColor(data.value) : 'transparent',
      color: isFocused ? 'white' : '#7f7f7f',
    };
  },
  // tslint:disable-next-line no-any , the input is actually any
  multiValue: (styles: CSSProperties, { data }: any) => {
    const eventColor = getEventColor(data.value);
    return {
      ...styles,
      backgroundColor: eventColor,
    };
  },
  multiValueLabel: (styles: CSSProperties) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles: CSSProperties) => ({
    ...styles,
    color: 'white',
    ':hover': {
      color: '#ff5d5d',
    },
  }),
};

export interface IProps {
  onEventTypesInput: (value: ValueType<{ value: EventTypeEnum; label: EventType }>) => void;
  value: Array<{ value: EventTypeEnum; label: EventType }>;
}

export const SelectMultiple: FC<IProps> = ({ onEventTypesInput, value }) => (
  <Select<{ value: EventTypeEnum; label: EventType }>
    options={options}
    value={value}
    onChange={onEventTypesInput}
    isMulti
    styles={optionStyles}
    components={makeAnimated()}
    closeMenuOnSelect={false}
    placeholder={'Arrangementtype...'}
    className={style.eventType}
  />
);
