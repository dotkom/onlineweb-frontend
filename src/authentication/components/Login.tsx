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
        <label htmlFor="username">Brukernavn</label>
        <input id="username" type="text" />
        <label htmlFor="password">Passord</label>
        <input id="password" type="password" />
        <button onClick={() => logIn()}>Logg inn</button>
        <div className={style.extra}>
          <button>Registrer</button>
          <button>Glemt passord</button>
        </div>
      </div>
    )}
  </div>
);

export default LoginView;
