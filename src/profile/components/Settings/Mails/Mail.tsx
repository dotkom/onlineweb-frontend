import React from 'react';
import { IMail } from '../../../models/Mail';
import style from './mail.less';

export interface IProps extends IMail {
  toggle: () => void;
}

const Mail = ({ email, primary, toggle }: IProps) => (
  <span className={style.gridRow} onClick={toggle}>
    <div className={style.mailInputGroup}>
      <input name="radio" type="radio" checked={primary} />
      <label>{ email }</label>
    </div>
  </span>
);

export default Mail;
