import React, { useState } from 'react';
import { IMail } from '../../../models/Mail';
import style from './mail.less';
import { Icon } from '@dotkomonline/design-system';
import { deleteMail } from 'profile/api/mail';

interface IProps extends IMail {
  callback: () => Promise<void>;
}
const Mail = ({ email, primary, verified, id, callback }: IProps) => {
  const [confirm, setConfirm] = useState(false);
  const handleClick = async () => {
    if (confirm) {
      await deleteMail(id);
      callback();
    } else {
      setConfirm(true);
    }
  };
  return (
    <li className={style.mail} tabIndex={0}>
      <h4 title={`Denne mailen er ${!verified ? 'ikke ' : ''}verifisert`}>
        {email}
        {verified ? <Icon name="verified" /> : null}
        {primary ? <span className={style.primary}> - Primær</span> : null}
      </h4>
      <button onClick={handleClick}>{confirm ? 'Bekreft' : <Icon name="delete" />}</button>
    </li>
  );
};

export default Mail;
