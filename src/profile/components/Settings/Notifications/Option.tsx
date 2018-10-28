import React from 'react';
import { INotificationOption, translations } from '../../../models/Notification';
import ToggleSwitch from 'common/components/ToggleSwitch';
import style from './notifications.less';

export interface IProps {
  option: keyof INotificationOption | 'allow_notifications';
  value: boolean;
  toggle: () => void;
}

const Option = ({ option, value, toggle }: IProps) => (
  <div className={style.element}>
    <h4>{ translations[option] }</h4>
    <div className={style.toggle}>
      <ToggleSwitch checked={value} onChange={toggle} />
    </div>
  </div>
);

export default Option;
