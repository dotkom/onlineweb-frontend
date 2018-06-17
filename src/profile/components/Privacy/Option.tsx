import React from 'react';
import { IPrivacy, translations } from '../../models/Privacy';

export interface IProps {
  option: keyof IPrivacy;
  value: boolean;
  toggle: Function;
}

const Option = ({ option, value, toggle }: IProps) => (
  <div>
    <p>{ translations[option] }</p>
    <div onClick={() => toggle()}>
      { value ? 'Y' : 'N' }
    </div>
  </div>
);

export default Option;
