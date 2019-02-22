import ToggleSwitch from 'common/components/ToggleSwitch';
import React from 'react';
import style from './notifications.less';

export interface IProps {
  name: string;
  description: string;
  value: boolean;
  toggle: () => void;
  disabled?: boolean;
}

const Option = ({ description, value, toggle, disabled }: IProps) => (
  <div className={style.element}>
    <h4>{description}</h4>
    <div className={style.toggle}>
      <ToggleSwitch checked={value} onChange={toggle} disabled={disabled} />
    </div>
  </div>
);

export default Option;
