import React from 'react';
import style from './input.less';
import classNames from 'classnames';
import Markdown, { md } from 'common/components/Markdown';
import PasswordInput from './PasswordInput';

const OLD_PASSWORD = md`
### Skriv inn ditt nåverende passord
`;

const NEW_PASSWORD = md`
### Skriv inn et nytt passord
`;

const NEW_PASSWORD_REQUIREMENTS = md`
- Passordet ditt må bestå av minst 8 tegn.
`;

const CONFIRM_PASSWORD = md`
### Gjenta det nye passordet
`;

const PasswordForm = () => {
  return (
    <form class={style.editPasswordInput}>
      <PasswordInput source="### Skriv inn ditt nåverende passord" name="old_password" />
    </form>
  );
};

export default PasswordForm;
