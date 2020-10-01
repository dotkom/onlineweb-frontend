import React from 'react';
import { IMail } from '../../../models/Mail';
import style from './mail.less';
import { Icon } from '@dotkomonline/design-system';

const Mail = ({ email, primary, verified }: IMail) => {
  return (
    <li className={style.mail} tabIndex={0}>
      <h4 title={`Denne mailen er ${!verified ? 'ikke ' : ''}verifisert`}>
        {email}
        {verified ? <Icon name="verified" /> : null}
        {primary ? <span className={style.primary}> - Primær</span> : null}
      </h4>
      <button>
        <Icon name="delete" />
      </button>
    </li>
  );
};

export default Mail;
