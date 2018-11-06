import ToggleSwitch from 'common/components/ToggleSwitch';
import React from 'react';
import { IPrivacy, translations } from '../../../models/Privacy';
import style from './privacy.less';

export interface IProps {
  option: keyof IPrivacy;
  value: boolean;
  toggle: () => void;
}

const Option = ({ option, value, toggle }: IProps) => (
  <div className={style.element}>
    <h4>{translations[option]}</h4>
    <div className={style.toggle}>
      <ToggleSwitch checked={value} onChange={toggle} />
    </div>
  </div>
);

export default Option;
