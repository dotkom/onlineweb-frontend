import React from 'react';
import { IPrivacy, translations } from '../../models/Privacy';
import ToggleSwitch from 'common/components/ToggleSwitch';
import style from '../Penalties/penalties.less';

export interface IProps {
  option: keyof IPrivacy;
  value: boolean;
  toggle: () => void;
}

const Option = ({ option, value, toggle }: IProps) => (
  <div className={style.gridRow}>
    <h4>{ translations[option] }</h4>
    <ToggleSwitch checked={value} onChange={toggle} />
  </div>
);

export default Option;
