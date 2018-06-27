import React from "react";
import classNames from 'classnames';

import Cross from './cross.svg';
import Check from './check.svg';
import './switch.less';

export interface IProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked = false, disabled = false , onChange }: IProps) => {
  return(
    <button disabled={disabled} onClick={onChange} className='toggle-container'>
      <div className={'toggle-slider' + (checked ? ' toggle-checked': '')}>
        <span className='toggle-icon'>
          <img src={checked ? Check : Cross} />
        </span>
      </div>
    </button>
  )
}

export default ToggleSwitch;
