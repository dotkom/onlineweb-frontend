import ToggleSwitch from 'common/components/ToggleSwitch';
import React from 'react';
import { INotificationSetting, optionStrings } from '../../../models/Notification';
import style from './notifications.less';

export interface IProps {
  option: keyof INotificationSetting | 'allowNotifications';
  value: boolean;
  toggle: () => void;
  disabled?: boolean;
}

const Option = ({ option, value, toggle, disabled }: IProps) => (
  <div className={style.element}>
    <h4>{optionStrings[option]}</h4>
    <div className={style.toggle}>
      <ToggleSwitch checked={value} onChange={toggle} disabled={disabled} />
    </div>
  </div>
);

export default Option;
