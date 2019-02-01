import React from 'react';
import { IMail } from '../../../models/Mail';
import style from './mail.less';

export interface IProps extends IMail {
  toggle: () => void;
}

const Mail = ({ email, primary, toggle }: IProps) => (
  <div className={style.mail} onClick={toggle} tabIndex={0}>
    <input name="radio" type="radio" checked={primary} readOnly />
    <label>{email}</label>
  </div>
);

export default Mail;
