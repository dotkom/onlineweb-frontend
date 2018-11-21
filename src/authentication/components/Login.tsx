import React from 'react';
import { logIn } from '../api';
import style from './login.less';

interface ILoginViewProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

const LoginView = (props: ILoginViewProps) => (
  <div className={style.login}>
    <button className={style.dropdownButton} onClick={props.onClick} title="Logg inn" />
    {props.isOpen && (
      <div className={style.loginMenu}>
        <button onClick={logIn}>Logg inn</button>
        <div className={style.extra}>
          <button>Registrer</button>
          <button>Glemt passord</button>
        </div>
      </div>
    )}
  </div>
);

export default LoginView;
