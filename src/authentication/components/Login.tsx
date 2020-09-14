import React from 'react';
import { logIn } from '../api';
import style from './login.less';
import { Button } from '@dotkomonline/design-system';

interface ILoginViewProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

const LoginView = (props: ILoginViewProps) => (
  <div className={style.login}>
    <button className={style.dropdownButton} onClick={props.onClick} title="Logg inn" />
    {props.isOpen && (
      <div className={style.loginMenu}>
        <Button onClick={logIn}>Logg inn</Button>
          <Button as='a' href='/auth/register/'>Registrer</Button>
          <Button as='a' href='/auth/recover/'>Glemt passord</Button>
      </div>
    )}
  </div>
);

export default LoginView;
