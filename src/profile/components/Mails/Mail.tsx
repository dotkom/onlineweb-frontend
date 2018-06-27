import React from 'react';
import { IMail } from '../../models/Mail';

export interface IProps extends IMail {
  toggle: () => void;
}

const Mail = ({ email, primary, toggle }: IProps) => (
  <span className="grid-row" onClick={toggle}>
    <div className="mail-input-group">
      <input id="mail-primary-radio" name="radio" type="radio" checked={primary} />
      <label>{ email }</label>
    </div>
  </span>
)

export default Mail;
