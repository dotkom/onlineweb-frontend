import React, { CSSProperties } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Styles } from 'react-select/src/styles';
import { ValueType } from 'react-select/src/types';

import style from './select.less';

const BASE_OPTION_STYLES: Partial<Styles> = {
  control: (styles: CSSProperties) => ({ ...styles, backgroundColor: 'white' }),
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

/** Not complete, as types for the library are lacking */
export interface IState<T> {
  data: ISelectable<T, string>;
  isFocused: boolean;
}

function getOptionStyles<T>(getColor: (data: T) => string): Partial<Styles> {
  return {
    ...BASE_OPTION_STYLES,
    option: (styles: CSSProperties, { data, isFocused }: IState<T>) => {
      return {
        ...styles,
        backgroundColor: isFocused ? getColor(data.value) : 'transparent',
        color: isFocused ? 'white' : '#7f7f7f',
      };
    },
    multiValue: (styles: CSSProperties, { data }: IState<T>) => {
      const eventColor = getColor(data.value);
      return {
        ...styles,
        backgroundColor: eventColor,
      };
    },
  };
}

export interface ISelectable<T, K> {
  value: T;
  label: K;
}

export interface IProps<T, K> {
  onChange: (value: ValueType<ISelectable<T, K>>) => void;
  selected: Array<ISelectable<T, K>>;
  selectOptions: Array<ISelectable<T, K>>;
  placeholder: string;
  getColor: (data: T) => string;
}

export function SelectMultiple<T, K>({ selected, selectOptions, getColor, ...props }: IProps<T, K>) {
  const optionStyles = getOptionStyles(getColor);
  return (
    <Select<ISelectable<T, K>>
      options={selectOptions}
      value={selected}
      isMulti
      styles={optionStyles}
      components={makeAnimated()}
      closeMenuOnSelect={false}
      className={style.eventType}
      {...props}
    />
  );
}
