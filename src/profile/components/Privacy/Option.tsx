import React from 'react';
import { IPrivacy, translations } from '../../models/Privacy';
import ToggleSwitch from 'common/components/ToggleSwitch'

export interface IProps {
  option: keyof IPrivacy;
  value: boolean;
  toggle: () => void;
}

const Option = ({ option, value, toggle }: IProps) => (
  <div className="grid-row">
    <h4>{ translations[option] }</h4>
    <ToggleSwitch checked={value} onChange={toggle} />
  </div>
);

export default Option;
