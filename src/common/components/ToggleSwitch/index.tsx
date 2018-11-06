import classNames from 'classnames';
import React from 'react';

import Check from './check.svg';
import Cross from './cross.svg';
import style from './switch.less';

export interface IProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked = false, disabled = false, onChange }: IProps) => {
  return (
    <button disabled={disabled} onClick={onChange} className={style.container}>
      <div
        className={classNames({
          [style.slider]: true,
          [style.sliderChecked]: checked,
        })}
      >
        <img className={style.icon} src={checked ? Check : Cross} />
      </div>
    </button>
  );
};

export default ToggleSwitch;
